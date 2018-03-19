import {
  UNSET_LOADING,
  SET_LOADING
} from '../actions/types';

/**
 *
 * @returns {Object} action
 */
export const setLoading = () => ({
  type: SET_LOADING
});

/**
 *
 * @returns {Object} action
 */
export const unsetLoading = () => ({
  type: UNSET_LOADING
});
