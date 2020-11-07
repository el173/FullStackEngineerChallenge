import { takeEvery, put } from 'redux-saga/effects';

import {
  HIDE_LOADING_SPINNER,
  HIDE_LOADING_SPINNER_OK,
  SHOW_LOADING_SPINNER,
  SHOW_LOADING_SPINNER_OK,
} from '../action-types';


const hideLoadingSpinner = function* ({ payload }) {
  const config = {
    ...payload,
    visible: false
  };
  yield put({ type: HIDE_LOADING_SPINNER_OK, payload: config });
};
  
export function* hideLoadingSpinnerSaga() {
  yield takeEvery(HIDE_LOADING_SPINNER, hideLoadingSpinner);
}

const showLoadingSpinner = function* ({ payload }) {
  const config = {
    ...payload,
    visible: true
  };
  yield put({ type: SHOW_LOADING_SPINNER_OK, payload: config });
};
  
export function* showLoadingSpinnerSaga() {
  yield takeEvery(SHOW_LOADING_SPINNER, showLoadingSpinner);
}