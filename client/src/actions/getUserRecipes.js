import axios from 'axios';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR
} from './types';

/**
 * @param {Object} userRecipes
 *
 * @returns {Object} userRecipes
 */
export const getUserRecipes = userRecipes => ({
  type: GET_USER_RECIPES,
  userRecipes
});


/**
 * @param {Object} message
 *
 * @returns {Object} message
 */
const getUserRecipesError = message => ({
  type: GET_USER_RECIPES_ERROR,
  message
});

/**
 *
 * @param {string} ID
 *
 * @returns {Object} response
 */
const fetchUserRecipes = ID => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`/api/v1/users/${ID}/recipes`)
    .then((response) => {
      const {
        data
      } = response;
      dispatch(getUserRecipes(data));
      dispatch(unsetLoading());
    }).catch((error) => {
      const {
        message
      } = error.response.data;
      dispatch(getUserRecipesError(message));
      dispatch(unsetLoading());
    });
};
/**
 *
 * @param {string} ID
 *
 * @returns {Object} response
 */
export const fetchUserFavouriteRecipes = ID => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`/api/v1/users/${ID}/favorites`)
    .then((response) => {
      const {
        data
      } = response;
      dispatch(getUserRecipes(data));
      dispatch(unsetLoading());
    }).catch((error) => {
      const {
        message
      } = error.response.data;
      dispatch(getUserRecipesError(message));
      dispatch(unsetLoading());
    });
};

export default fetchUserRecipes;
