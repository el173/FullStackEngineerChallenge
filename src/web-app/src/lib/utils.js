import { 
  SHOW_LOADING_SPINNER,
  HIDE_LOADING_SPINNER,
} from '../action-types';

import {
  API_BASE
} from '../settings';

/**
 * by calling this function could show/hide main loading spinner
 * @param {bool} status 
 */
export const showLoadingSpinner = (status = true) => {
  global.store.dispatch({ type: status ? SHOW_LOADING_SPINNER : HIDE_LOADING_SPINNER });
};

/**
 * Get available menu list for user type
 * @param {string} userType 
 */
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

/**
 * Get actual API endpoint
 * @param {string} endPoint 
 */
export const createUrl = (endPoint) => {
  return `${API_BASE}/${endPoint}`
};

/**
 * Format parameters as url encoded params 
 * @param {JSON} params 
 */
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

/**
 * Common function to execute all the network calls
 * @param {string} url 
 * @param {string} method 
 * @param {JSON} params 
 */
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

/**
 * Get user object from browser session
 */
export const getCurrentUserFromSession = () => {
  let loggedUserObj = window.sessionStorage.getItem("user");
  return loggedUserObj ? JSON.parse(loggedUserObj) : null;
}