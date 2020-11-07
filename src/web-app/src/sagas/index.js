import { all } from 'redux-saga/effects';

import { 
  checkLoginSaga,
  logOutSaga,
} from './login';

import { 
  showLoadingSpinnerSaga,
  hideLoadingSpinnerSaga,
} from './common';

export default function* root() {
  yield all([
    checkLoginSaga(),
    showLoadingSpinnerSaga(),
    hideLoadingSpinnerSaga(),
    logOutSaga(),
  ]);
}