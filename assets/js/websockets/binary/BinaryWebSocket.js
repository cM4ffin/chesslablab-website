import AbstractWebSocket from '../AbstractWebSocket.js';
import * as connect from '../../connect.js';

export class BinaryWebSocket extends AbstractWebSocket {
  static PORT = 7443;

  async connect() {
    await super.connect(`${connect.ws()}:${BinaryWebSocket.PORT}`);

    this.binaryType = "arraybuffer";

    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      switch (msg) {
        case 'error':
          console.log('Whoops! Something went wrong.');
          break;

        default:
          const data = JSON.parse(res.data);
          const a = document.createElement("a");
          a.href = 'data:image/png;base64,' + data['/image'];
          a.download = "chessboard.png";
          a.click();
          break;
      }
    };
  }
}

export const binaryWebSocket = new BinaryWebSocket();
