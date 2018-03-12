import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_FAILURE,
  GET_SINGLE_RECIPE,
  GET_SINGLE_RECIPE_ERROR,
} from '../actions/types';

const initialState = {
  recipes: {
    allrecipes: [],
    singleRecipe: {
      id: 0,
      favourite: 0,
      upvoteCount: 0,
      downvoteCount: 0,
      reviews: []
    }
  }
};

/**
 *
 *
 * @param {any} [state=initialState.recipes]
 * @param {any} action
 * @returns {any} any
 */
const recipes = (state = initialState.recipes, action) => {
  switch (action.type) {
    case LOAD_RECIPES_SUCCESS:
      return {
        ...state,
        allrecipes: action.recipes
      };
    case LOAD_RECIPES_FAILURE:
      return {
        ...state,
        errorMessage: action.message
      };
    case GET_SINGLE_RECIPE:
      return {
        ...state,
        singleRecipe: action.recipe
      };
    case GET_SINGLE_RECIPE_ERROR:
      return {
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default recipes;
