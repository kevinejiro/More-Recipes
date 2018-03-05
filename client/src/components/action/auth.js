import axios from 'axios';

import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from './types';

const {
  serverUrl
} = process.env;

/**
 *
 * @param {object} signUpData
 *
 * @return {object} reducer info
 */
export const signUpSuccess = signUpData => ({
  type: SIGN_UP_SUCCESS,
  signUpData
});
/**
 *
 * @param {object} error
 *
 * @return {object} reducer info
 */
export const signUpFailure = error => ({
  type: SIGN_UP_FAILURE,
  error
});

/**
 * @param {object} signUpInfo SignUp Object
 *
 * @returns {dispatch} dispatch to store
 */
export function signUpAction(signUpInfo) {
  return (dispatch) => {
    axios.post(`${serverUrl}/users/signup`, signUpInfo)
      .then((response) => {
        dispatch(signUpSuccess(response.data));
        return response.data;
        // this.setState({
        //   isLoading: false,
        //   error: {}
        // });
      })
      .catch((error) => {
        console.log(error);
        dispatch(signUpFailure(error.response));
        // this.setState({
        //   isLoading: false,
        //   error: errors
        // });
      });
  };
}
