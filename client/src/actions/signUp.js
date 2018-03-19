import axios from 'axios';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import {
  GET_AUTH,
  GET_AUTH_ERROR
} from '../actions/types';

/**
 *
 * @param {any} user
 * @param {any} token
 *
 * @returns {Object} action
 */
export const getAuth = (user, token) => ({
  type: GET_AUTH,
  isAuthenticated: true,
  user,
  token
});

/**
 *
 * @param {String} message - Error Message
 *
 * @returns {Object} action
 */
export const getAuthError = message => ({
  type: GET_AUTH_ERROR,
  isAuthenticated: false,
  message
});


/**
 *
 *
 * @param {Object} userDetails
 * @returns {Promise} thunk function
 */
const getSignUp = userDetails => (dispatch) => {
  dispatch(setLoading());
  return axios.post('/api/v1/users/signup', userDetails)
    .then((response) => {
      const {
        user,
        token
      } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      dispatch(getAuth(user, token));
      dispatch(unsetLoading());
    }).catch((error) => {
      const {
        message
      } = error.response.data;
      dispatch(getAuthError(message));
      dispatch(unsetLoading());
    });
};

export default getSignUp;
