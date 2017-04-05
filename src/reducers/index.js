import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';
import playersOnlineReducer from './playerOnline';
import diceBoxReducer from './diceBox';
import gameReducer from './game';

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  playersOnline: playersOnlineReducer,
  diceBox: diceBoxReducer,
  game: gameReducer,
});

export default reducer;
