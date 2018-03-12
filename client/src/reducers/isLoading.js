import {
  UNSET_LOADING,
  SET_LOADING
} from '../actions/types';

const initialState = false;

/**
 * @returns {Object} true
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
