import { 
    CHANGE_NAVIGATION_OK,
    SHOW_LOADING_SPINNER_OK,
    HIDE_LOADING_SPINNER_OK,
  } from '../action-types';
  
  export default (state = { fetching: false }, action) => {
    switch (action.type) {
      case CHANGE_NAVIGATION_OK:
        return {
          ...state,
          navigationConfig: action.payload,
        };
        case SHOW_LOADING_SPINNER_OK:
        case HIDE_LOADING_SPINNER_OK:
          return {
            ...state,
            loadingSpinnerConfig: action.payload,
          }; 
      default:
        return state;
    }
  };
  