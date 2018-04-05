import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR,
  ADD_RECIPE_SUCCESS
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
  console.log(state, 'this is the state', action);
  switch (action.type) {
    case ADD_RECIPE_SUCCESS:
      return {
        ...state,
        userRecipes: [
          ...state.userRecipes,
          action.recipeInfo,
        ],
        errorMessage: ''
      };
    case GET_USER_RECIPES:
      return {
        ...state,
        userRecipes: action.userRecipes.recipes || [],
        username: action.userRecipes.username,
        errorMessage: ''
      };
    case GET_USER_RECIPES_ERROR:
      return {
        ...state,
        userRecipes: [],
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default userRecipes;
