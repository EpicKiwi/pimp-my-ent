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
