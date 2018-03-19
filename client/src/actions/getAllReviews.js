import axios from 'axios';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import {
  GET_REVIEWS,
  GET_REVIEWS_ERROR
} from '../actions/types';

/**
 *
 * @param {Object} reviews
 *
 * @returns {Object} action
 */
export const allReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
});

/**
 *
 * @param {String} message - Error Message
 *
 * @returns {Object} action
 */
export const allReviewsError = message => ({
  type: GET_REVIEWS_ERROR,
  message
});

/**
 *
 *
 * @param {string} id
 * @returns {Promise} thunk function
 */
const getAllReviews = id => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`/api/v1/recipes/${id}/reviews`)
    .then((response) => {
      const {
        reviews
      } = response.data;
      dispatch(allReviews(reviews));
      dispatch(unsetLoading());
    }).catch((error) => {
      const {
        message
      } = error.response.data;
      dispatch(allReviewsError(message));
      dispatch(unsetLoading());
    });
};

export default getAllReviews;
