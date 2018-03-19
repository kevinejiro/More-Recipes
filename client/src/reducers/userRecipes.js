import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR
} from '../actions/types';

const initialState = {
  userRecipes: [],
  username: ''
};

/**
 *
 *
 * @param {any} [state=initialState.userRecipes]
 * @param {any} action
 *
 * @returns {any} any
 */
const userRecipes = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_RECIPES:
      return {
        ...state,
        userRecipes: action.userRecipes.recipes,
        username: action.userRecipes.username
      };
    case GET_USER_RECIPES_ERROR:
      return {
        ...state,
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default userRecipes;
