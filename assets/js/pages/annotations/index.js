import { learnForm } from './LearnForm.js';
import { dataWebSocket } from '../../websockets/data/DataWebSocket.js';
import { annotationsWebSocket } from '../../websockets/game/AnnotationsWebSocket.js';
import * as variant from '../../../variant.js';

try {
  await Promise.all([
    dataWebSocket.connect(),
    annotationsWebSocket.connect()
  ]);
} catch {}

dataWebSocket
  .send(`/annotations_game`)
  .onChange('/annotations_game', data => {
    const tbody = learnForm.el.getElementsByTagName('tbody')[0];
    tbody.replaceChildren();
    data.forEach(game => {
      const tr = document.createElement('tr');

      const eventTd = document.createElement('td');
      const roundTd = document.createElement('td');
      const yearTd = document.createElement('td');

      const ecoTd = document.createElement('td');
      const whiteTd = document.createElement('td');
      const whiteEloTd = document.createElement('td');
      const blackTd = document.createElement('td');
      const blackEloTd = document.createElement('td');
      const resultTd = document.createElement('td');

      eventTd.appendChild(document.createTextNode(game.Event));
      roundTd.appendChild(document.createTextNode(game.Round));
      yearTd.appendChild(document.createTextNode(game.Date));

      ecoTd.appendChild(document.createTextNode(game.ECO));
      whiteTd.appendChild(document.createTextNode(game.White));
      whiteEloTd.appendChild(document.createTextNode(game.WhiteElo));
      blackTd.appendChild(document.createTextNode(game.Black));
      blackEloTd.appendChild(document.createTextNode(game.BlackElo));
      resultTd.appendChild(document.createTextNode(game.Result));

      tr.appendChild(eventTd);
      tr.appendChild(roundTd);
      tr.appendChild(yearTd);
      tr.appendChild(ecoTd);
      tr.appendChild(whiteTd);
      tr.appendChild(whiteEloTd);
      tr.appendChild(blackTd);
      tr.appendChild(blackEloTd);
      tr.appendChild(resultTd);

      tr.addEventListener('click', async (event) => {
        learnForm.progressModal.props.modal.show();
        annotationsWebSocket.send('/play_rav', {
          variant: variant.CLASSICAL,
          movetext: game.movetext
        });
      });

      tbody.appendChild(tr);

      learnForm.progressModal.props.modal.hide();
    });
  });
