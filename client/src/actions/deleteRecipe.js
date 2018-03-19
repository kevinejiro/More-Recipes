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
const deleteRecipe = id => () => {
  const token = localStorage.getItem('token');
  setLoading();
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
      toastr.error(`${message}`);
      unsetLoading();
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
    });
};

export default deleteRecipe;
