import { all } from 'redux-saga/effects';

import { checkLoginSaga } from './login';

import { 
  changeNavigationSaga,
  showLoadingSpinnerSaga,
  hideLoadingSpinnerSaga,
} from './common';

export default function* root() {
  yield all([
    checkLoginSaga(),
    changeNavigationSaga(),
    showLoadingSpinnerSaga(),
    hideLoadingSpinnerSaga(),
  ]);
}