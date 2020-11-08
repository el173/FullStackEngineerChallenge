import { takeEvery, put } from 'redux-saga/effects';

import {
  GET_EMP_LIST,
  GET_EMP_LIST_OK,
  ASSIGN_REVIEWER,
  ASSIGN_REVIEWER_OK,
  GET_ALL_REVIEWS,
  GET_ALL_REVIEWS_OK,
  UPDATE_REVIEW,
  UPDATE_REVIEW_OK,
  GET_MY_REVIEW,
  GET_MY_REVIEW_OK,
  GET_ASSIGNED_REVIEWS,
  GET_ASSIGNED_REVIEWS_OK,
} from '../action-types';

import {
  createUrl,
  makeNetworkRequest,
  getCurrentUserFromSession
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
    yield put({ type: GET_ALL_REVIEWS });
    alert('Reviewer added');
    yield put({ type: ASSIGN_REVIEWER_OK, payload: true });
  }
};
    
export function* assignReviewerSaga() {
  yield takeEvery(ASSIGN_REVIEWER, assignReviewer);
}

const getAllReviews = function* ({ payload }) {
  const response = yield makeNetworkRequest(createUrl('listEmpReviews'), 'POST');
  yield put({ type: GET_ALL_REVIEWS_OK, payload: response.success ? response.data : [] });
};
    
export function* getAllReviewsSaga() {
  yield takeEvery(GET_ALL_REVIEWS, getAllReviews);
}

const updateReview = function* ({ payload }) {
  let adminId = null;
  if (payload.byAdmin) {
    const loggedUserObj = getCurrentUserFromSession();
    adminId = loggedUserObj ? loggedUserObj.id : false;
  }
  const params = {
    feedback: payload.feedback,
    feedbackId: payload.feedbackId,
    byAdmin: adminId ? payload.byAdmin : false,
    adminId,
  };
  const response = yield makeNetworkRequest(createUrl('updateReview'), 'PUT', params);
  if(response.success) {
    alert('Feedback updated');
    yield put({ type: payload.byAdmin ? GET_ALL_REVIEWS : GET_ASSIGNED_REVIEWS});
    yield put({ type: UPDATE_REVIEW_OK, payload: response.success });
  }
};
    
export function* updateReviewSaga() {
  yield takeEvery(UPDATE_REVIEW, updateReview);
}

const getMyReviews = function* ({ payload }) {
  const loggedUserObj = getCurrentUserFromSession();
  const params = {
    id: loggedUserObj ? loggedUserObj.id : false,
  };
  const response = yield makeNetworkRequest(createUrl('getMyReviews'), 'POST', params);
  yield put({ type: GET_MY_REVIEW_OK, payload: response.success ? response.data : [] });
};
    
export function* getMyReviewsSaga() {
  yield takeEvery(GET_MY_REVIEW, getMyReviews);
}

const getAssignedReview = function* ({ payload }) {
  const loggedUserObj = getCurrentUserFromSession();
  const params = {
    reviewer: true,
    id: loggedUserObj ? loggedUserObj.id : false,
  };
  const response = yield makeNetworkRequest(createUrl('getMyReviews'), 'POST', params);
  yield put({ type: GET_ASSIGNED_REVIEWS_OK, payload: response.success ? response.data : [] });
};
    
export function* getAssignedReviewSaga() {
  yield takeEvery(GET_ASSIGNED_REVIEWS, getAssignedReview);
}