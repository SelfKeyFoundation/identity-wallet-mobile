let navigator;
let currentRoute;
const listeners = [];

export function setNavigator(n) {
  navigator = n;
}

export function navigate(routeName, params) {
  if (!navigator) {
    return;
  }

  navigator.navigate(routeName, params);
  currentRoute = routeName;

  listeners.forEach((callback) => {
    callback(routeName, params);
  });
}

export function onNavigate(listener) {
  listeners.push(listener);
}

export function getParams(name, defaultValue) {
  return navigator.getParams(name, defaultValue);
};
