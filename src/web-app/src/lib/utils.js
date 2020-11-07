import { 
  CHANGE_NAVIGATION,
  SHOW_LOADING_SPINNER,
  HIDE_LOADING_SPINNER,
} from '../action-types';

export const navigateTo = (routeName) => {
  global.store.dispatch({
    type: CHANGE_NAVIGATION,
    payload: {
      route: routeName
    }
  });
};

export const showLoadingSpinner = (status = true) => {
  global.store.dispatch({ type: status ? SHOW_LOADING_SPINNER : HIDE_LOADING_SPINNER });
};