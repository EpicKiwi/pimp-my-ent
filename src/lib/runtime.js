function getRuntime() {
  var selectedRuntime = null;
  if (typeof browser !== "undefined") {
    selectedRuntime = browser.runtime;
  } else if (typeof chrome !== "undefined") {
    selectedRuntime = chrome.runtime;
  }
  return selectedRuntime;
}
