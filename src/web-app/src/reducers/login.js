import { 
    CHECK_LOGIN_OK,
    LOGOUT_USER_OK,
    ADD_USER_OK,
    UPDATE_USER_OK,
    DELETE_USER_OK,
} from '../action-types';
  
export default (state = { fetching: false }, action) => {
  switch (action.type) {
    case CHECK_LOGIN_OK:
    case LOGOUT_USER_OK:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case ADD_USER_OK:
      return {
        ...state,
        userAdded: action.payload,
      };  
    case UPDATE_USER_OK:
      return {
        ...state,
        userUpdated: action.payload,
      };
    case DELETE_USER_OK:
      return {
        ...state,
        userDeleted: action.payload,
      };  
    default:
      return state;
  }
};
  