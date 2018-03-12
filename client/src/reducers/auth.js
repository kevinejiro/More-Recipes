import {
  GET_AUTH,
  GET_AUTH_ERROR,
} from '../actions/types';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user'))
};

/**
 *
 *
 * @param {any} [state=initialState]
 * @param {any} action
 * @returns {any} any
 */
const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        token: action.token
      };
    case GET_AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default auth;
