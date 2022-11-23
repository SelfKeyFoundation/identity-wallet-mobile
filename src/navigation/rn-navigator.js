import { WalletTracker } from '../WalletTracker';

export class ReactNativeNavigator {
  constructor(navigator) {
    this.navigator = navigator;
  }

  navigate(routeName, params) {
    if (!this.navigator) {
      return;
    }

    WalletTracker.trackPageView(routeName);

    const route = typeof routeName === 'object'
      ? routeName
      : {
        routeName,
        params,
      };

    console.log('navigator', this);

    this.navigator.navigate(routeName, params);
  }

  getParams(name, defaultValue) {
    return this.navigator.getParam(name, defaultValue);
  }
}


