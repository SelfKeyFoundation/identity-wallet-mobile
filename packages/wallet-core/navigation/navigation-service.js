let navigator;

export function setNavigator(n) {
  navigator = n;
}

export function navigate(routeName, params) {
  if (!navigator) {
    return;
  }

  navigator.navigate(routeName, params);
}

export const getParam = navigator.getParam;
