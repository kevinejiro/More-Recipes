import axios from 'axios';
import toastr from 'toastr';

import {
  ADD_RECIPE_SUCCESS
} from './types';


import {
  unsetLoading,
  setLoading
} from './isLoading';

/**
 *
 * @param {object} recipeInfo
 *
 * @returns {object} action
 */
export const addRecipeSuccess = recipeInfo => ({
  type: ADD_RECIPE_SUCCESS,
  recipeInfo
});

/**
 *
 *
 * @param {any} recipeData
 * @returns {Promise} thunk function
 */
const addRecipe = recipeData => (dispatch) => {
  const userToken = localStorage.getItem('token');
  dispatch(setLoading());
  return axios.post('/api/v1/recipes', {
    title: recipeData.title,
    description: recipeData.description,
    ingredients: recipeData.ingredients,
    direction: recipeData.direction,
    image: recipeData.image
  }, {
    headers: {
      token: userToken
    }
  }).then((response) => {
    console.log('the response========', response);
    dispatch(addRecipeSuccess(response.data.recipe));
    dispatch(unsetLoading());
  }).catch((error) => {
    console.log('the error====', error);
    const errorMessage = error;
    toastr.options = {
      closeButton: true,
      extendedTimeOut: '1000',
      positionClass: 'toast-bottom-right',
      hideMethod: 'fadeOut'
    };
    toastr.error(`${errorMessage}`);
    dispatch(unsetLoading());
  });
};

export default addRecipe;
