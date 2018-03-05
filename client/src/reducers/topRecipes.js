import {
  LOAD_TOP_RECIPES_REQUEST,
  LOAD_TOP_RECIPES_SUCCESS,
  LOAD_TOP_RECIPES_FAILURE
} from '../actions/types';
/**
 *
 * @param {object} state
 * @param {object} action
 *
 * @return {object} new state
 */
export default function topRecipesReducer(state = {
  recipes: [],
  fetching: false,
  fetched: false,
  message: '',
  error: {}
}, action) {
  switch (action.type) {
    case LOAD_TOP_RECIPES_REQUEST: {
      return {
        // ...state,
        error: {},
        fetching: true,
        fetched: false,
        recipes: []
      };
    }
    case LOAD_TOP_RECIPES_SUCCESS:
      return {
        // ...state,
        error: {},
        fetching: false,
        fetched:
          (action.recipes.message !== 'No recipes found'),
        message: action.recipes.message,
        recipes: action.recipes
      };
    case LOAD_TOP_RECIPES_FAILURE:
      return {
        // ...state,
        error: action.error,
        fetching: false,
        fetched: false,
        recipes: []
      };
    default:
      return state;
  }
}
