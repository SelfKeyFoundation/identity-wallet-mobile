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
    this.res = `${width}x${height}`;
    this.readyListeners = [];

    DeviceInfo.getUserAgent().then(value => {
      this.userAgent = value;
      this.isReady = true;
      this.onReady();
    })
  }

  onReady() {
    this.beforeReady().then(() => {
      this.readyListeners.forEach((callback) => callback.apply(null, []));   
    })
  }

  beforeReady() {
    return Promise.resolve({});
  }

  buildOptions(opts = {}) {
    // https://developer.matomo.org/api-reference/tracking-api
    const options =  {...opts};
    options.idsite = this.siteId;
    options.rec = 1;

    if (this.pageViewId) {
      options.pv_id = this.pageViewId;
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

  track(opts) {
    const doTrack = () => {
      const options = this.buildOptions(opts);
      const requestUrl = this.url + '?' + qs.stringify(options);
      console.log('Track', options);
      return fetch(requestUrl);
    }

    if (this.isReady) {
      return doTrack();
    }

    this.readyListeners.push(doTrack);
  }

  trackPageView(route) {
    this.pageViewId = uuid();
    return this.track({
      url: `app://${route}`
    });
  }

  trackCustomEvent({ category, action, name, value, variables, dimensions = [] }) {
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

    return this.track(event);
  }
}
