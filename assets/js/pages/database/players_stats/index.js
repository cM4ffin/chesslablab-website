import playersStatsModal from './playersStatsModal.js';
import gameActionsDropdown from '../../../pages/gameActionsDropdown.js';
import gameStudyDropdown from '../../../pages/gameStudyDropdown.js';
import historyButtons from '../../../pages/historyButtons.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

playersStatsModal.modal.show();
