import axios from 'axios';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import {
  SIGN_IN_AUTH,
  GET_AUTH_ERROR
} from './types';

/**
 *
 * @param {String} token
 *
 * @returns {void} void
 */
export function setAxiosHeader(token) {
  if (token) {
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.common.token;
  }
}

/**
 *
 * @param {any} user
 * @param {any} token
 * @returns {object} userdetails
 */
export const signInAuth = (user, token) => ({
  type: SIGN_IN_AUTH,
  isAuthenticated: true,
  user,
  token
});

/**
 *
 * @param {object} message
 *
 * @returns {object} message
 */
export const getAuthError = message => ({
  type: GET_AUTH_ERROR,
  isAuthenticated: false,
  message
});

/**
 *
 *
 * @param {object} userDetails
 *
 * @returns {object} response
 */
const getSignIn = userDetails => (dispatch) => {
  dispatch(setLoading());
  return axios.post('/api/v1/users/signin', userDetails)
    .then((response) => {
      const {
        user,
        token
      } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setAxiosHeader(token);
      dispatch(signInAuth(user, token));

      dispatch(unsetLoading());
    }).catch((error) => {
      const {
        message
      } = error.response.data;
      dispatch(getAuthError(message));
      dispatch(unsetLoading());
    });
};

export default getSignIn;
