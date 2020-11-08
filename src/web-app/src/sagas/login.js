import { takeEvery, put } from 'redux-saga/effects';

import {
  CHECK_LOGIN,
  CHECK_LOGIN_OK,
  LOGOUT_USER,
  LOGOUT_USER_OK,
  ADD_USER,
  ADD_USER_OK,
  GET_EMP_LIST,
  UPDATE_USER,
  UPDATE_USER_OK,
  DELETE_USER,
  DELETE_USER_OK,
} from '../action-types';

import {
  createUrl,
  makeNetworkRequest,
} from '../lib/utils';

const checkLogin = function* ({ payload }) {
  if (payload.userName && payload.password) {
    const params = {
      username: payload.userName,
      password: payload.password,
    };
    const response = yield makeNetworkRequest(createUrl('checkLogin'), 'POST', params);
    if(response.success) {
      const user = {
        logged: true,
        id: response.data.id,
        userName: response.data.userName,
        userType: response.data.userType,
      };
      window.sessionStorage.setItem('user', JSON.stringify(user));
      yield put({ type: CHECK_LOGIN_OK, payload: user });
    }
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

const addUser = function* ({payload}) {
  const params = {
    username: payload.username,
    password: payload.password,
    userType: payload.type,
  };
  const response = yield makeNetworkRequest(createUrl('addUser'), 'PUT', params);
  if(response.success) {
    payload.callback();
    yield put({ type: GET_EMP_LIST });
    yield put({ type: ADD_USER_OK, payload: true });
    alert('Record saved');
  }
};
    
export function* addUserSaga() {
  yield takeEvery(ADD_USER, addUser);
}

const updateUser = function* ({payload}) {
  const params = {
    username: payload.username,
    password: payload.password,
    userType: payload.type,
    userId: payload.userId,
  };
  const response = yield makeNetworkRequest(createUrl('updateUser'), 'PUT', params);
  if(response.success) {
    payload.callback();
    yield put({ type: GET_EMP_LIST });
    yield put({ type: UPDATE_USER_OK, payload: true });
    alert('Record updated');
  }
};
    
export function* updateUserSaga() {
  yield takeEvery(UPDATE_USER, updateUser);
}

const deleteUser = function* ({payload}) {
  const params = {
    userId: payload.userId,
  };
  const response = yield makeNetworkRequest(createUrl('removeUser'), 'DELETE', params);
  if(response.success) {
    yield put({ type: GET_EMP_LIST });
    yield put({ type: DELETE_USER_OK, payload: true });
    alert('Record removed');
  }
};
    
export function* deleteUserSaga() {
  yield takeEvery(DELETE_USER, deleteUser);
}
