import { NavigationActions } from 'react-navigation';

export class ReactNativeNavigator {
  constructor(navigator) {
    this.navigator = navigator;
  }

  navigate(routeName, params) {
    if (!this.navigator) {
      return;
    }

    const route = typeof routeName === 'object'
      ? routeName
      : NavigationActions.navigate({
        routeName,
        params,
      });

    this.navigator.dispatch(route);
  }

  getParam(name, defaultValue) {
    return this.navigator.getParam(name, defaultValue);
  }
}


