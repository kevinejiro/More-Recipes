import axios from 'axios';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_FAILURE
} from './types';

/**
 *
 * @param {Object} recipes
 *
 * @returns {Object} action
 */
export const allrecipes = recipes => ({
  type: LOAD_RECIPES_SUCCESS,
  recipes
});

/**
 *
 * @param {String} message - Error Message
 *
 * @returns {Object} action
 */
export const allrecipesError = message => ({
  type: LOAD_RECIPES_FAILURE,
  message
});

/**
 *
 * @param {Object} dispatch
 *
 * @returns {Object} response
 */
const getAllRecipes = () => (dispatch) => {
  dispatch(setLoading());
  return axios.get('/api/v1/recipes')
    .then((response) => {
      const {
        recipes
      } = response.data;
      dispatch(allrecipes(recipes));
      dispatch(unsetLoading());
    }).catch((error) => {
      const {
        message
      } = error.response.data;
      dispatch(allrecipesError(message));
      dispatch(unsetLoading());
    });
};

export default getAllRecipes;
