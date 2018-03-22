import axios from 'axios';
import toastr from 'toastr';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import getAllReviews from './getAllReviews';

/**
 *
 *
 * @param {Object} reviewData
 * @returns {Promise} thunk function
 */
const postReview = reviewData => (dispatch) => {
  const id = reviewData.recipeId;
  const token = localStorage.getItem('token');

  dispatch(setLoading());
  return axios.post(`/api/v1/recipes/${id}/reviews`, {
    content: reviewData.content
  }, {
    headers: {
      token
    }
  }).then(() => {
    dispatch(getAllReviews(id));
    dispatch(unsetLoading());
  }).catch((error) => {
    const errorMessage = error.response.data.message;
    toastr.options = {
      closeButton: true,
      extendedTimeOut: '1000',
      positionClass: 'toast-bottom-right',
      hideMethod: 'fadeOut'
    };
    toastr.error(`Could not add review ${errorMessage}`);
    dispatch(unsetLoading());
  });
};

export default postReview;
