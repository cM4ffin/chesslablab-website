import AbstractWebSocket from '../AbstractWebSocket.js';
import * as connect from '../../connect.js';

export class DataWebSocket extends AbstractWebSocket {
  static PORT = 9443;

  async connect() {
    await super.connect(`${connect.ws()}:${DataWebSocket.PORT}`);

    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      switch (msg) {
        case 'error':
          console.log('Whoops! Something went wrong.');
          break;

        default:
          break;
      }
    };
  }
}

export const dataWebSocket = new DataWebSocket();
