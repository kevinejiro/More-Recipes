import axios from 'axios';
import toastr from 'toastr';

import {
  unsetLoading,
  setLoading
} from './isLoading';


/**
 *
 *
 * @param {any} recipeData
 * @returns {Promise} thunk function
 */
const addRecipe = recipeData => () => {
  const userToken = localStorage.getItem('token');
  setLoading();
  return axios.post('/api/v1/recipes', {
    title: recipeData.title,
    description: recipeData.description,
    ingredients: recipeData.ingredients,
    direction: recipeData.direction,
  }, {
    headers: {
      token: userToken
    }
  }).then(() => {
    unsetLoading();
  }).catch((error) => {
    const errorMessage = error.response.data.message;
    toastr.options = {
      closeButton: true,
      extendedTimeOut: '1000',
      positionClass: 'toast-bottom-right',
      hideMethod: 'fadeOut'
    };
    toastr.error(`${errorMessage}`);
    unsetLoading();
  });
};

export default addRecipe;
