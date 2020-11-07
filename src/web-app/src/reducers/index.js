import { combineReducers } from 'redux';

import userReducer from './login';
import commonReducer from './common';
import employeeReducer from './employee';

export default combineReducers({
  login: userReducer,
  common: commonReducer,
  employee: employeeReducer,
});