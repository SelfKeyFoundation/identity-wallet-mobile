let navigator;

export function setNavigator(n) {
  navigator = n;
}

export function navigate(routeName, params) {
  navigator.navigate(routeName, params);
}


