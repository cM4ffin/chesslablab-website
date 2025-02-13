import AbstractWebSocket from './AbstractWebSocket.js';

export class DataWebSocket extends AbstractWebSocket {
  static PORT = 9443;

  async connect() {
    await super.connect(DataWebSocket.PORT);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      if (msg === 'error') {
        console.log('Whoops! Something went wrong.');
      }
    };
  }
}

export const dataWebSocket = new DataWebSocket();
