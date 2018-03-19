import {
  UNSET_LOADING,
  SET_LOADING
} from '../actions/types';

const initialState = false;

/**
 *
 *
 * @param {any} [state=initialState]
 * @param {any} action
 *
 * @returns {any} true
 */
const isLoading = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return true;
    case UNSET_LOADING:
      return false;
    default:
      return state;
  }
};

export default isLoading;
