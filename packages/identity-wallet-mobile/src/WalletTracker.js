
import { MatomoTracker } from './MatomoTracker';
import { getConfigs, onConfigChange } from '@selfkey/configs';
import { updateViewCount } from '@selfkey/wallet-core/modules/app/app-module-utils';
import { getRealmInstance } from '@selfkey/wallet-core/db/realm-service';


const matomo = new MatomoTracker({
  url: getConfigs().matomoUrl,
  siteId: getConfigs().matomoSiteId,
});

const pageViewId = matomo.pageViewId;

function waitForDB() {
  return new Promise(resolve => {
    const doCheck = () => {
      if (getRealmInstance()) {
        resolve();
      } else {
        setTimeout(doCheck, 500);
      }
    };

    doCheck(); 
  });
}

matomo.beforeReady = async () => {
  await waitForDB();
  await updateViewCount().then(settings => {
    matomo.userId = settings.userId;
    matomo.visitCount = settings.views;

    if (settings.views <= 1) {
      WalletTracker.trackEvent({
        action: 'install',
        category: 'app',
        level: 'machine'
      }, {
        pageViewId,
        priority: 1,
      });
    }
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

  static flush() {
    return matomo.flush();  
  }

  static trackEvent({ category, action, name, value, level, variables = {} }, trackOptions) {
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

    matomo.trackCustomEvent(event, trackOptions)  
  }
}