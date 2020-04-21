import { NavigationActions } from 'react-navigation';
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
      : NavigationActions.navigate({
        routeName,
        params,
      });

    this.navigator.dispatch(route);
  }

  getParams(name, defaultValue) {
    return this.navigator.getParam(name, defaultValue);
  }
}


