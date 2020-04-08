import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';
import uuid from 'uuid/v4';
import qs from 'querystring';

const { width, height } = Dimensions.get('window');

export class MatomoTracker {
  constructor({ url, siteId, res }) {
    this.url = url;
    this.siteId = siteId;
    this.isReady = false;
    this.res = `${parseInt(width)}x${parseInt(height)}`;
    this.trackingQueue = [];
    this.pageViewId = uuid();

    DeviceInfo.getUserAgent().then(value => {
      this.userAgent = value;
      this.isReady = true;
      this.onReady();
    });
  }

  flush() {
    clearTimeout(this.trackingQueueTimeout);
    return this.flushTrackingQueue();
  }

  async flushTrackingQueue() {
    await fetch(this.url, {
      method: 'post',
      body: JSON.stringify({
        requests: this.trackingQueue.map(({ opts, trackOptions }) => {
          const options = this.buildOptions(opts, trackOptions);
          return '?' + qs.stringify(options);
        })
      }),
    });

    this.trackingQueue = [];
  }

  handleTrackingQueue() {
    if (!this.isReady || this.trackingQueueStarted || this.trackingQueue === 0) {
      this.trackingQueueStarted = false;
      return;
    }

    this.trackingQueueStarted = true;

    this.trackingQueueTimeout = setTimeout(async () => {
      if (!this.trackingQueue.length) {
        return;
      }

      await this.flushTrackingQueue();
      this.handleTrackingQueue();
    }, 500);
  }

  onReady() {
    this.beforeReady().then(() => {
      this.handleTrackingQueue();
    })
  }

  beforeReady() {
    return Promise.resolve({});
  }

  buildOptions(opts = {}, trackOptions) {
    // https://developer.matomo.org/api-reference/tracking-api
    const options =  {...opts};
    options.idsite = this.siteId;
    options.rec = 1;

    if (trackOptions.pageViewId) {
      options.pv_id = trackOptions.pageViewId;
    }

    if (this.visitCount) {
      options._idvc = this.visitCount;
    }

    if (this.userId) {
      options.uid = this.userId;
    }

    if (this.lastVisitorId !== this.userId) {
      options.new_visit = 1;
    }

    this.lastVisitorId = this.userId;

    /**
     * - Add screen size
     */
    options.ua = this.userAgent;
    options.res = this.res;

    return options;
  }

  track(opts, trackOptions = {}) {
    if (!trackOptions.pageViewId) {
      trackOptions.pageViewId = this.pageViewId;
    }

    if (trackOptions.priority === 0) {
      const options = this.buildOptions(opts, trackOptions);
      const params = '?' + qs.stringify(options);  
      return fetch(`${this.url}${params}`);
    }

    const trackingParams = {
      opts,
      trackOptions
    };

    if (trackOptions.priority === 1) {
      this.trackingQueue = [
        trackingParams,
        ...this.trackingQueue,
      ]
    } else {
      this.trackingQueue.push(trackingParams);
    }

    if (this.isReady) {
      this.handleTrackingQueue();
    }
  }

  trackPageView(route, trackOptions) {
    this.pageViewId = uuid();
    return this.track({
      url: `app://${route}`
    }, trackOptions);
  }

  trackCustomEvent({ category, action, name, value, variables, dimensions = [] }, trackOptions) {
    const event = {
      e_c: category,
      e_a: action,
      e_n: name,
      e_v: value,
    };

    if (variables) {
      const cvar = {};
      Object.keys(variables).forEach((key, index) => {
        const value = variables[key];
        cvar[`${index + 1}`] = [key, value];
      });

      event.cvar = JSON.stringify(cvar);
    }

    dimensions.forEach((dimension) => {
      event[`dimension${dimension.id}`] = dimension.value;
    });

    return this.track(event, trackOptions);
  }
}
