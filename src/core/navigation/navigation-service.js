let navigator;
let currentRoute;
const listeners = [];
let history = [];

export function setNavigator(n) {
  navigator = n;
}

export function navigate(routeName, params) {
  if (!navigator) {
    console.error('navigator not defined')
    return;
  }

  console.log('navigate to ', routeName)
  navigator.navigate(routeName, params);

  history.push({
    routeName,
    params,
  });

  currentRoute = routeName;

  listeners.forEach((callback) => {
    callback(routeName, params);
  });
}

export function navigateBack(){
  history.pop();

  if (!history.length) {
    return;
  }

  const { routeName, params } = history.pop();
  navigate(routeName, params);
}

export function onNavigate(listener) {
  listeners.push(listener);
}

export function getParams(name, defaultValue) {
  return navigator.getParams(name, defaultValue);
};
