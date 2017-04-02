import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';


const reducer = combineReducers({
  auth: authReducer,  
  users: usersReducer
});

export default reducer;