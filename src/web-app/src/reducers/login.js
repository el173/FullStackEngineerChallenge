import { 
    CHECK_LOGIN_OK, 
} from '../action-types';
  
export default (state = { fetching: false }, action) => {
  switch (action.type) {
    case CHECK_LOGIN_OK:
      return {
        ...state,
        loggedUser: action.payload,
      };
    default:
      return state;
  }
};
  