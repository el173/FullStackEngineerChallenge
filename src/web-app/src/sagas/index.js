import { all } from 'redux-saga/effects';

import { 
  checkLoginSaga,
  logOutSaga,
  addUserSaga,
  updateUserSaga,
  deleteUserSaga,
} from './login';

import { 
  showLoadingSpinnerSaga,
  hideLoadingSpinnerSaga,
} from './common';

import {
  getAllEmployeeSaga,
  assignReviewerSaga,
  getAllReviewsSaga,
  updateReviewSaga,
  getMyReviewsSaga,
  getAssignedReviewSaga,
} from './employee';

export default function* root() {
  yield all([
    checkLoginSaga(),
    showLoadingSpinnerSaga(),
    hideLoadingSpinnerSaga(),
    logOutSaga(),
    getAllEmployeeSaga(),
    addUserSaga(),
    updateUserSaga(),
    deleteUserSaga(),
    assignReviewerSaga(),
    getAllReviewsSaga(),
    updateReviewSaga(),
    getMyReviewsSaga(),
    getAssignedReviewSaga(),
  ]);
}