import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';
import playersOnlineReducer from './playerOnline';
import diceBoxReducer from './diceBox';
import gameReducer from './game';
import marketReducer from './market';
import rollCountReducer from './rollCount';
import enterGameReducer from './enterGame';

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  playersOnline: playersOnlineReducer,
  diceBox: diceBoxReducer,
  game: gameReducer,
  market: marketReducer,
  rollCount: rollCountReducer,
  PlayersInGame: enterGameReducer,
});

export default reducer;
