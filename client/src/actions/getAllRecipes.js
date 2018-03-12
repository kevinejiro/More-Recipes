import axios from 'axios';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_FAILURE
} from '../actions/types';

export const allrecipes = recipes => ({
  type: LOAD_RECIPES_SUCCESS,
  recipes
});

export const allrecipesError = message => ({
  type: LOAD_RECIPES_FAILURE,
  message
});

/**
 * 
 * 
 * @param {any} dispatch 
 * @returns 
 */
const getAllRecipes = () => (dispatch) => {
  console.log('======= first');
  dispatch(setLoading());
  return axios.get('/api/v1/recipes')
    .then((response) => {
      console.log('=======', response.data);
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
      console.log('======= sec');
    });
};

export default getAllRecipes;
