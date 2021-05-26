
const defaultConfig = {
  "rootEndpoint":"https://dev.instance.kyc-chain.com/api/v2/",
  "secret": "",
  "endpoints":{
     "/templates/:id":"/templates/:id?format=minimum",
     "/kyc-users/me":"/users/me",
     "/kyc-users":"/users"
  }
}

export function parseJson(jsonData, defaultValue = defaultConfig) {
  try {
    return JSON.parse(jsonData);
  } catch(err) {
    return defaultValue;
  }
}