import axios from 'axios';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_FAILURE,
  SEARCH_RECIPES_SUCCESS
} from './types';

/**
 *
 * @param {Object} recipes
 *
 * @returns {Object} action
 */
export const allrecipes = recipes => ({
  type: SEARCH_RECIPES_SUCCESS,
  payload: recipes
});

/**
 *
 * @param {any} { recipes, pagination }
 *
 * @returns {Object} payload
 */
export const loadRecipesSucess = ({ recipes, pagination }) => ({
  type: LOAD_RECIPES_SUCCESS,
  payload: {
    recipes,
    pagination
  }
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
const getAllRecipes = ({ page, limit }) => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`/api/v1/recipes?page=${page}&limit=${limit}`)
    .then((response) => {
      dispatch(loadRecipesSucess(response.data));
      dispatch(unsetLoading());
    }).catch((error) => {
      const {
        message
      } = error.response.data;
      dispatch(allrecipesError(message));
      dispatch(unsetLoading());
    });
};

/**
 *
 * @param {Object} items
 *
 * @returns {Object} response
 */
export const searchRecipes = items => (dispatch) => {
  dispatch(setLoading());
  return axios.get('/api/v1/recipes', {
    params: {
      search: 'recipes',
      items
    }
  })
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
