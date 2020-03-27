
import { MatomoTracker } from './MatomoTracker';
import { getConfigs, onConfigChange } from '@selfkey/configs';
import { updateViewCount } from '@selfkey/wallet-core/modules/app/app-module-utils';

const matomo = new MatomoTracker({
  url: getConfigs().matomoUrl,
  siteId: getConfigs().matomoSiteId,
});

matomo.beforeReady = async () => {
  await updateViewCount().then(settings => {
    matomo.userId = settings.userId;
    matomo.visitCount = settings.views;
  });
};

onConfigChange(() => {
  matomo.url = getConfigs().matomoUrl;
  matomo.siteId = getConfigs().matomoSiteId;
});

export class WalletTracker {
  static trackPageView(route) {
    matomo.trackPageView(route);
  }

  static trackEvent({ category, action, name, value, level, variables = {} }) {
    const event = {
      category,
      action,
      name,
      value,
      variables: {
        level: level || 'machine',
        ...variables
      }
    };

    matomo.trackCustomEvent(event)  
  }
}