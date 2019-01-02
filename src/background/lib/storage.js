export function getStorage() {
  var selectedStorage = null;
  if (typeof browser !== "undefined") {
    selectedStorage = browser.storage.sync;
    if (!selectedStorage) selectedStorage = browser.storage.local;
  } else if (typeof chrome !== "undefined") {
    selectedStorage = chrome.storage.sync;
    if (!selectedStorage) selectedStorage = chrome.storage.local;
  }
  return selectedStorage;
}

export async function storageGet(storage, ...args) {
  if (typeof chrome !== "undefined") {
    return new Promise(resolve => storage.get(...[...args, resolve]));
  }
  return await storage.get(...args);
}

export async function storageSet(storage, ...args) {
  if (typeof chrome !== "undefined") {
    return new Promise(resolve => storage.set(...[...args, resolve]));
  }
  return await storage.set(...args);
}
