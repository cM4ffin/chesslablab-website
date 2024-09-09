import { HistoryButtons } from '@chesslablab/js-utils';
import movesMetadataTable from './movesMetadataTable.js';
import MyBoardActionsDropdown from './MyBoardActionsDropdown.js';
import ravMovesBrowser from './ravMovesBrowser.js';
import AbstractComponent from '../AbstractComponent.js';
import { binaryWebSocket } from '../websockets/binary/BinaryWebSocket.js';

export class RavPanel extends AbstractComponent {
  mount() {
    this.props.boardActionsDropdown.el.children.item(3).addEventListener('click', (event) => {
      event.preventDefault();
      const params = {
        fen: this.props.movesBrowser.props.fen[this.props.movesBrowser.current],
        flip: this.props.movesBrowser.props.chessboard.getOrientation()
      };
      binaryWebSocket.send(`/image "${JSON.stringify(params).replace(/"/g, '\\"')}"`);
    });
  }
}

export const ravPanel = new RavPanel(
  document.getElementById('ravPanel'),
  {
    boardActionsDropdown: new MyBoardActionsDropdown(
      document.querySelector('#boardActionsDropdown ul'),
      {
        movesBrowser: ravMovesBrowser
      }
    ),
    historyButtons: new HistoryButtons(
      document.querySelector('#historyButtons'),
      {
        movesBrowser: ravMovesBrowser
      }
    ),
    movesMetadataTable: movesMetadataTable,
    movesBrowser: ravMovesBrowser
  }
);
