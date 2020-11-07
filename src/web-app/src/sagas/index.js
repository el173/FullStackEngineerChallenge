import { all } from 'redux-saga/effects';

import { checkLoginSaga } from './login';

export default function* root() {
  yield all([
    checkLoginSaga(),
  ]);
}