import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_FAILURE,
  SEARCH_RECIPES_SUCCESS,
  GET_SINGLE_RECIPE,
  GET_SINGLE_RECIPE_ERROR,
  GET_REVIEWS,
  GET_REVIEWS_ERROR
} from '../actions/types';

const initialState = {
  recipes: {
    allrecipes: {
      recipes: [],
      pagination: {
        totalCount: 0,
        lastPage: 1,
        currentPage: 1
      }
    },
    oneRecipe: {
      id: 0,
      upvoteCount: 0,
      downvoteCount: 0,
      reviews: [],
      User: {},
      Favorites: []
    },
    allReviews: [],
    searchAction: false,
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
        allrecipes: {
          recipes: action.payload.recipes,
          pagination: action.payload.pagination
        },
        searchAction: false,
      };
    case LOAD_RECIPES_FAILURE:
      return {
        ...state,
        errorMessage: action.message
      };
    case SEARCH_RECIPES_SUCCESS:
      return {
        ...state,
        allrecipes: {
          ...state.allrecipes,
          recipes: action.payload
        },
        searchAction: true,
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
