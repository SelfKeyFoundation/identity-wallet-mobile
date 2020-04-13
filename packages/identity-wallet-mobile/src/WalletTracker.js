
import { MatomoTracker } from './MatomoTracker';
import { getConfigs, onConfigChange } from '@selfkey/configs';
import { updateViewCount } from '@selfkey/wallet-core/modules/app/app-module-utils';
import { getRealmInstance } from '@selfkey/wallet-core/db/realm-service';
import { Routes } from '@selfkey/wallet-core/navigation';

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

const modalRoutes = [
  Routes.TOKEN_DETAILS,
  Routes.APP_SEND_TOKENS,
];

export class WalletTracker {
  static trackPageView(route) {
    // Will not track page view for modals
    if (modalRoutes.find(r => r === route)) {
      return;
    }

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