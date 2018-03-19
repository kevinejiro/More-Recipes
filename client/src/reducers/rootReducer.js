import {
  combineReducers
} from 'redux';

import isLoading from './isLoading';
import recipes from './recipes';
import auth from './auth';
import userRecipes from './userRecipes';


const rootReducer = combineReducers({
  isLoading,
  recipes,
  userRecipes,
  auth
});

export default rootReducer;
