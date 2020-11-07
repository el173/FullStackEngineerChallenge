import { combineReducers } from 'redux';

import userReducer from './login';
import commonReducer from './common';

export default combineReducers({
  login: userReducer,
  common: commonReducer,
});