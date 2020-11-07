import {
  CHECK_LOGIN
} from '../../../action-types';


export const checkLogin = (payload) => (
  { type: CHECK_LOGIN, payload }
);