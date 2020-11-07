import { 
  SHOW_LOADING_SPINNER,
  HIDE_LOADING_SPINNER,
} from '../action-types';

import {
  API_BASE
} from '../settings';

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

export const createUrl = (endPoint) => {
  return `${API_BASE}/${endPoint}`
};

export const createParams = params => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return formBody;
};

 export const makeNetworkRequest = async (url, method = 'GET', params = {}) => {
  try {
    showLoadingSpinner(true);
    const response = await fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: createParams(params),
    });
    if (response !== null) {
      let responseJson = await response.json();
      if(responseJson && !responseJson.success) {
        alert('Oops something went wrong');
      }
      showLoadingSpinner(false);
      return responseJson;
    } else {
      alert('Oops something went wrong');
    }
    showLoadingSpinner(false);
  } catch (error) {
    alert('Oops something went wrong');
    showLoadingSpinner(false);
    return {
      success: false,
    }
  }
}