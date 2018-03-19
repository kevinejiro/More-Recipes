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
const editRecipe = (recipeData, id) => () => {
  const userToken = localStorage.getItem('token');

  setLoading();
  return axios.put(`/api/v1/recipes/${id}`, {
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

export default editRecipe;
