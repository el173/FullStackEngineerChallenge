import { combineReducers } from 'redux';

import userReducer from './login';

export default combineReducers({
  login: userReducer,
});