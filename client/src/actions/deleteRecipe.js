import axios from 'axios';
import toastr from 'toastr';

import {
  unsetLoading,
  setLoading
} from './isLoading';

/**
 *
 * @param {string} id
 *
 * @returns {Promise} thunk function
 */
const deleteRecipe = id => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setLoading());
  return axios.delete(`/api/v1/recipes/${id}`, {
    headers: {
      token
    }
  })
    .then((response) => {
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
    })
    .catch((error) => {
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

export default deleteRecipe;
