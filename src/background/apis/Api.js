export class Api {
  static get apiName() {
    return "";
  }

  constructor(connection) {
    this.conn = connection;
    this.conn.onMessage.addListener(this.onMessage.bind(this));
  }

  onMessage(message) {}
}
