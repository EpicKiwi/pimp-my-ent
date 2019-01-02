import { Api } from "./Api.js";
import { getStorage, storageGet, storageSet } from "../lib/storage.js";

export class EmailsApi extends Api {
  static get apiName() {
    return "login-emails";
  }

  constructor(conn) {
    super(conn);
    this.storage = getStorage();
  }

  async sendEmails() {
    let content = await storageGet(this.storage);
    let emails = content.savedEmails ? content.savedEmails : [];
    this.conn.postMessage({ type: "email-list", emails });
  }

  async addEmail(email) {
    let content = await storageGet(this.storage);
    let emails = content.savedEmails ? content.savedEmails : [];

    if (email && emails.indexOf(email) == -1) {
      await storageSet(this.storage, { savedEmails: [email, ...emails] });
      console.log("Pushed email", email);
    }
  }

  async removeEmail(email) {
    let content = await storageGet(this.storage);
    let emails = content.savedEmails ? content.savedEmails : [];

    let newEmails = emails.filter(el => el !== email);
    await storageSet(this.storage, { savedEmails: newEmails });
    console.log("removed email", email);
  }

  onMessage(message) {
    switch (message.type) {
      case "get-emails":
        this.sendEmails();
        break;
      case "add-email":
        this.addEmail(message.email);
        break;
      case "remove-email":
        this.removeEmail(message.email);
        break;
    }
  }
}
