import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';
import playersOnlineReducer from './playerOnline';

const reducer = combineReducers({  
  auth: authReducer,  
  users: usersReducer,
  playersOnline: playersOnlineReducer
});

export default reducer;