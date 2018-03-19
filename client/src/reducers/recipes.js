import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_FAILURE,
  GET_SINGLE_RECIPE,
  GET_SINGLE_RECIPE_ERROR,
  GET_REVIEWS,
  GET_REVIEWS_ERROR,
} from '../actions/types';

const initialState = {
  recipes: {
    allrecipes: [],
    oneRecipe: {
      id: 0,
      favourite: 0,
      upvoteCount: 0,
      downvoteCount: 0,
      reviews: [],
      User: {}
    },
    allReviews: [],
  }
};

/**
 *
 *
 * @param {any} [state=initialState.recipes]
 * @param {any} action
 *
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
        oneRecipe: action.recipe
      };
    case GET_SINGLE_RECIPE_ERROR:
      return {
        errorMessage: action.message
      };
    case GET_REVIEWS:
      return {
        ...state,
        allReviews: action.reviews
      };
    case GET_REVIEWS_ERROR:
      return {
        ...state,
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default recipes;
