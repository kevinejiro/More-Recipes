import axios from 'axios';

import {
  unsetLoading,
  setLoading
} from './isLoading';

import {
  GET_SINGLE_RECIPE,
  GET_SINGLE_RECIPE_ERROR
} from '../actions/types';


export const oneRecipe = recipes => ({
  type: GET_SINGLE_RECIPE,
  recipes
});

export const oneRecipeError = message => ({
  type: GET_SINGLE_RECIPE_ERROR,
  message
});


// action for get all recipes
const getSingleRecipe = id => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`/api/v1/recipes/${id}`)
    .then((response) => {
      const {
        recipes
      } = response.data;
      dispatch(oneRecipe(recipes));
      dispatch(unsetLoading());
    }).catch((error) => {
      const {
        message
      } = error.response.data;
      dispatch(oneRecipeError(message));
      dispatch(unsetLoading());
    });
};

export default getSingleRecipe;
