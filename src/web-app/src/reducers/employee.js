import {
    GET_EMP_LIST_OK,
    ASSIGN_REVIEWER_OK,
  } from '../action-types';
  
  export default (state = { fetching: false }, action) => {
    switch (action.type) {
      case GET_EMP_LIST_OK:
        return {
          ...state,
          employeeList: action.payload,
        };
      case ASSIGN_REVIEWER_OK:
        return {
          ...state,
          reviewerAdded: action.payload,
        };  
      default:
        return state;
    }
  };