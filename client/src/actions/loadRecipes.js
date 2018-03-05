import axios from 'axios';

import {
  LOAD_TOP_RECIPES_REQUEST,
  LOAD_TOP_RECIPES_SUCCESS,
  LOAD_TOP_RECIPES_FAILURE
} from './types';

/**
 * @returns {object} action
 */
export const loadTopRecipesRequest = () => ({
  type: LOAD_TOP_RECIPES_REQUEST
});
/**
 * @param {array} recipes
 *
 * @returns {object} action
 */
export const loadTopRecipesSuccess = recipes => ({
  type: LOAD_TOP_RECIPES_SUCCESS,
  recipes
});

/**
 *
 * @param {object} error
 *
 * @returns {object} action
 *
 */
export const loadTopRecipesFailure = error => ({
  type: LOAD_TOP_RECIPES_FAILURE,
  error
});

/**
 * @returns {object} dispatch to store
 */
export function topRecipes() {
  return (dispatch) => {
    dispatch(loadTopRecipesRequest());
    axios.get('/api/v1/recipes')
      .then((response) => {
        dispatch(loadTopRecipesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loadTopRecipesFailure(error.response.data));
      });
  };
}
