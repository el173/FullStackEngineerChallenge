import {
    GET_EMP_LIST_OK,
    ASSIGN_REVIEWER_OK,
    GET_ALL_REVIEWS_OK,
    UPDATE_REVIEW_OK,
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
      case GET_ALL_REVIEWS_OK:
        return {
          ...state,
          allReviewList: action.payload,
        };
      case UPDATE_REVIEW_OK:
        return {
          ...state,
          reviewUpdated: action.payload,
        };  
      default:
        return state;
    }
  };