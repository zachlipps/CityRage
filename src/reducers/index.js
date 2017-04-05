import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';
import playersOnlineReducer from './playerOnline';
import diceBoxReducer from './diceBox';

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  playersOnline: playersOnlineReducer,
  diceBox: diceBoxReducer,
});

export default reducer;
