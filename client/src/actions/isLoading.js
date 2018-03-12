import {
  UNSET_LOADING,
  SET_LOADING
} from '../actions/types';

export const setLoading = () => ({
  type: SET_LOADING
});

export const unsetLoading = () => ({
  type: UNSET_LOADING
});
