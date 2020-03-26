
import { MatomoTracker } from './MatomoTracker';
import { getConfigs, onConfigChange } from '@selfkey/configs';

let matomo = new MatomoTracker({
  url: getConfigs().matomoUrl,
  siteId: getConfigs().matomoSiteId,
});

onConfigChange(() => {
  matomo.url = getConfigs().matomoUrl;
  matomo.siteId = getConfigs().matomoSiteId;
});

export class WalletTracker {
  static trackPageView(route) {
    matomo.trackPageView(route);
  }

  static trackEvent({ category, action, name, value, level, variables = {} }) {
    matomo.trackCustomEvent({
      category,
      action,
      name,
      value,
      // dimensions: [{
      //   id: 1,
      //   value: level || 'machine',
      // }],
      variables: {
        level: level || 'machine',
        ...variables
      }
    })  
  }
}