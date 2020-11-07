import { takeEvery, put } from 'redux-saga/effects';

import {
  CHECK_LOGIN,
  CHECK_LOGIN_OK
} from '../action-types';

const checkLogin = function* ({ payload }) {
  alert(JSON.stringify(payload));
  const user = {
    logged: true,
    userName: 'abc',
    userType: 'admin'
  };
  window.sessionStorage.setItem('user', JSON.stringify(user));
  yield put({ type: CHECK_LOGIN_OK, payload: user });
};
    
export function* checkLoginSaga() {
  yield takeEvery(CHECK_LOGIN, checkLogin);
}