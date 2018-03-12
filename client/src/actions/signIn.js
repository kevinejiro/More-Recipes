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
 *
 * @param {any} user
 * @param {any} token
 */
export const getAuth = (user, token) => ({
  type: GET_AUTH,
  isAuthenticated: true,
  user,
  token
});
/**
 *
 *
 * @param {any} message
 */
export const getAuthError = message => ({
  type: GET_AUTH_ERROR,
  isAuthenticated: false,
  message
});


/**
 *
 *
 * @param {any} dispatch
 * @returns
 */
const getSignIn = userDetails => (dispatch) => {
  console.log('start');
  dispatch(setLoading());
  return axios.post('/api/v1/users/signin', userDetails)
    .then((response) => {
      console.log('======', response);
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
      console.log(message);
      dispatch(getAuthError(message));
      dispatch(unsetLoading());
    });
};

export default getSignIn;
