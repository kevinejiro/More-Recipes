import {
  GET_AUTH,
  GET_AUTH_ERROR,
  SIGN_IN_AUTH,
  SIGN_OUT
} from '../actions/types';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || {},
  errorMessage: null
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
        errorMessage: '',
        user: action.user,
        token: action.token
      };
    case GET_AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.message
      };
    case SIGN_IN_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user,
        token: action.token
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: '',
        user: {},
        token: ''
      };
    default:
      return state;
  }
};

export default auth;
