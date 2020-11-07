import { 
    CHECK_LOGIN_OK,
    LOGOUT_USER_OK,
} from '../action-types';
  
export default (state = { fetching: false }, action) => {
  switch (action.type) {
    case CHECK_LOGIN_OK:
    case LOGOUT_USER_OK:  
      return {
        ...state,
        loggedUser: action.payload,
      };
    default:
      return state;
  }
};
  