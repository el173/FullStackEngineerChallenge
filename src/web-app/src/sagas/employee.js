import { takeEvery, put } from 'redux-saga/effects';

import {
  GET_EMP_LIST,
  GET_EMP_LIST_OK,
  ASSIGN_REVIEWER,
  ASSIGN_REVIEWER_OK,
} from '../action-types';

import {
  createUrl,
  makeNetworkRequest,
} from '../lib/utils';

const getAllEmployee = function* ({ payload }) {
  let url = payload && payload.empOnly ? createUrl('listEmployeesOnly') : createUrl('listEmployees');
  const response = yield makeNetworkRequest(url, 'POST');
  yield put({ type: GET_EMP_LIST_OK, payload: response.success ? response.data : [] });
};
    
export function* getAllEmployeeSaga() {
  yield takeEvery(GET_EMP_LIST, getAllEmployee);
}

const assignReviewer = function* ({ payload }) {
  const params = {
    reviewer: payload.reviewer,
    receiver: payload.receiver,
  }
  const response = yield makeNetworkRequest(createUrl('assignEmployeeReview') , 'PUT', params);
  if(response.success) {
    alert('Reviewer added');
    yield put({ type: ASSIGN_REVIEWER_OK, payload: true });
  }
};
    
export function* assignReviewerSaga() {
  yield takeEvery(ASSIGN_REVIEWER, assignReviewer);
}