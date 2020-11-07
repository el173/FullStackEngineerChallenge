import { takeEvery, put } from 'redux-saga/effects';

import {
  CHECK_LOGIN,
  CHECK_LOGIN_OK
} from '../action-types';

const checkLogin = function* ({ payload }) {
  yield put({ type: CHECK_LOGIN_OK, payload });
};
    
export function* checkLoginSaga() {
  yield takeEvery(CHECK_LOGIN, checkLogin);
}