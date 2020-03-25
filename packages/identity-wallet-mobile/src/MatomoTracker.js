/**
 * A Node.js wrapper for the Matomo (http://matomo.org) tracking HTTP API
 * https://github.com/matomo-org/matomo-nodejs-tracker
 *
 * @author  Frederic Hemberger, Matomo Team
 * @license MIT
 */

import DeviceInfo from 'react-native-device-info';
const qs = require('querystring');

export class MatomoTracker {
  constructor({ url, siteId }) {
    this.url = url;
    this.siteId = siteId;
    this.isReady = false;
    this.readyListeners = [];

    DeviceInfo.getUserAgent().then(value => {
      this.userAgent = value;
      this.isReady = true;
      this.onReady();
    })
  }

  onReady() {
    this.readyListeners.forEach((callback) => callback.apply(null, []));   
  }

  buildOptions(opts) {
    // https://developer.matomo.org/api-reference/tracking-api
    const options = opts || {};
    options.idsite = this.siteId;
    options.rec = 1;
    /**
     * - Add screen size
     */
    options.ua = this.userAgent;
    // options.res = '350x200';

    return options;
  }

  track(opts) {
    const doTrack = () => {
      const options = this.buildOptions(opts);
      const requestUrl = this.url + '?' + qs.stringify(options);
      return fetch(requestUrl);
    }

    if (this.isReady) {
      return doTrack();
    }

    this.readyListeners.push(doTrack);
  }

  trackPageView(url) {
    return this.track({
      url
    });
  }
}

// /**
//  * @constructor
//  * @param {Number} siteId     Id of the site you want to track
//  * @param {String} trackerUrl URL of your Matomo instance
//  * @param {Boolean} [true] noURLValidation Set to true if the `piwik.php` has been renamed
//  */
// export function MatomoTracker (siteId, trackerUrl, noURLValidation) {
//   if (!(this instanceof MatomoTracker)) {
//     return new MatomoTracker(siteId, trackerUrl, noURLValidation);
//   }
//   events.EventEmitter.call(this);

//   assert.ok(siteId && (typeof siteId === 'number' || typeof siteId === 'string'), 'Matomo siteId required.');
//   assert.ok(trackerUrl && typeof trackerUrl === 'string', 'Matomo tracker URL required, e.g. http://example.com/matomo.php');
//   if (!noURLValidation) {
//     assert.ok(trackerUrl.endsWith('matomo.php') || trackerUrl.endsWith('piwik.php'), 'A tracker URL must end with "matomo.php" or "piwik.php"');
//   }

//   this.siteId = siteId;
//   this.trackerUrl = trackerUrl;

// }

// util.inherits(MatomoTracker, events.EventEmitter);


// MatomoTracker.prototype.trackBulk = function trackBulk (events, callback) {
//   var hasErrorListeners = this.listeners('error').length;
//   var body = JSON.stringify({
//     requests: events.map(query => {
//       query.idsite = this.siteId;
//       query.rec = 1;
//       return '?' + qs.stringify(query);
//     })
//   });

//   return fetch({
//     url: this.trackerUrl,
//     method: 'POST',
//     body: body,
//   })

  // const req = this.agent.request(requestOptions, res => {
  //   if (!/^(20[04]|30[12478])$/.test(res.statusCode)) {
  //     if (hasErrorListeners) {
  //       this.emit('error', res.statusCode);
  //     }
  //   }

  //   let data = [];

  //   res.on('data', chunk => {
  //     data.push(chunk);
  //   });

  //   res.on('end', () => {
  //     data = Buffer.concat(data).toString();
  //     typeof callback === 'function' && callback(data);
  //   });
  // });

  // req.on('error', (err) => {
  //     hasErrorListeners && this.emit('error', err.message);
  //   }
  // );

  // req.write(body);
  // req.end();
// };
