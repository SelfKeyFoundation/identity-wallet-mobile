

export function parseJson(jsonData, defaultValue = {}) {
  try {
    return JSON.parse(jsonData);
  } catch(err) {
    return defaultValue;
  }
}