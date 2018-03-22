import axios from 'axios';
import toastr from 'toastr';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import getSingleRecipe from './getSingleRecipe';


/**
 *
 * @param {string} id
 *
 * @returns {Promise} thunk function
 */
const favouriteRecipe = id => (dispatch) => {
  const token = localStorage.getItem('token');

  dispatch(setLoading());
  return axios.post(`/api/v1/recipes/${id}/favorite`, {
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
      dispatch(getSingleRecipe(id));
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

export default favouriteRecipe;
