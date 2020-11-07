import { 
  SHOW_LOADING_SPINNER,
  HIDE_LOADING_SPINNER,
} from '../action-types';


export const showLoadingSpinner = (status = true) => {
  global.store.dispatch({ type: status ? SHOW_LOADING_SPINNER : HIDE_LOADING_SPINNER });
};

export const getMenuByUserType = (userType) => {
  let menus = [];
  switch (userType) {
    case 'admin':
      menus = [
        { id: 'emp', text: 'Employees' },
        { id: 'rvw', text: 'Reviews' },
        { id: 'asrvw', text: 'Assign reviews' },
      ];
      break;
    case 'employee':
      menus = [
        { id: 'myrvw', text: 'My reviews' },
      ];
      break;  
    default:
      break;    
  };
  return menus;
};