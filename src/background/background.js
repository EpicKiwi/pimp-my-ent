import * as apis from "./apis/index.js";
import { getRuntime } from "./lib/runtime.js";

getRuntime().onConnect.addListener(connection => {
  let ApiClass = Object.values(apis).find(el => el.apiName == connection.name);
  console.info("New connection", ApiClass.name);
  if (ApiClass) {
    new ApiClass(connection);
  }
});
