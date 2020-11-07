import { takeEvery, put } from 'redux-saga/effects';

import {
  CHECK_LOGIN,
  CHECK_LOGIN_OK,
  LOGOUT_USER,
  LOGOUT_USER_OK,
} from '../action-types';

const checkLogin = function* ({ payload }) {
  if (payload.userName && payload.password) {
    const user = {
      logged: true,
      userName: payload.userName,
      userType: 'admin'
    };
    window.sessionStorage.setItem('user', JSON.stringify(user));
    yield put({ type: CHECK_LOGIN_OK, payload: user });
  } else {
    alert('Invalid input');
  }
};
    
export function* checkLoginSaga() {
  yield takeEvery(CHECK_LOGIN, checkLogin);
}

const logOut = function* () {
  window.sessionStorage.setItem('user', null);
  yield put({ type: LOGOUT_USER_OK, payload: null });
};
    
export function* logOutSaga() {
  yield takeEvery(LOGOUT_USER, logOut);
}