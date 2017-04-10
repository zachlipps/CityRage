import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';
import playersOnlineReducer from './playerOnline';
import diceBoxReducer from './diceBox';
import gameReducer from './game';
import marketReducer from './market';
import rollCountReducer from './rollCount';
import enterGameReducer from './enterGame';
import gamesListReducer from './gamesList';
import lobbyReducer from './lobby';

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  lobby: lobbyReducer,
  playersOnline: playersOnlineReducer,
  diceBox: diceBoxReducer,
  game: gameReducer,
  gamesList: gamesListReducer,
  market: marketReducer,
  rollCount: rollCountReducer,
  PlayersInGame: enterGameReducer,
});

export default reducer;
