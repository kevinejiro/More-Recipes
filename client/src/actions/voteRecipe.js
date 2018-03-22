import axios from 'axios';
import toastr from 'toastr';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import fetchRecipe from './getSingleRecipe';
/**
 * @param {any} voteType
 * @param {string} id
 *
 * @returns {Promise} thunk function
 */
const voteRecipe = (voteType, id) => (dispatch) => {
  const token = localStorage.getItem('token');

  dispatch(setLoading());
  return axios.post(`/api/v1/recipes/${id}/${voteType}`, null, {
    headers: {
      token
    }
  })
    .then((response) => {
      dispatch(fetchRecipe(id));
      const {
        message
      } = response.data;
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.success(`${message}`);
      dispatch(unsetLoading());
    }).catch((error) => {
      const errorMessage = error.response.data.message;
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.error(`${errorMessage}`);
      dispatch(unsetLoading());
    });
};

export default voteRecipe;
