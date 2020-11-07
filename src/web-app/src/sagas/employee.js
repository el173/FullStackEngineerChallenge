import { takeEvery, put } from 'redux-saga/effects';

import {
  GET_EMP_LIST,
  GET_EMP_LIST_OK,
} from '../action-types';

import {
  createUrl,
  makeNetworkRequest,
} from '../lib/utils';

const getAllEmployee = function* ({ payload }) {
  const response = yield makeNetworkRequest(createUrl('listEmployees'), 'POST');
  yield put({ type: GET_EMP_LIST_OK, payload: response.success ? response.data : [] });
};
    
export function* getAllEmployeeSaga() {
  yield takeEvery(GET_EMP_LIST, getAllEmployee);
}