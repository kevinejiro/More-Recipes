import {
  combineReducers
} from 'redux';

import isLoading from './isLoading';
import recipes from './recipes';
import auth from './auth';


const rootReducer = combineReducers({
  isLoading,
  recipes,
  auth
});

export default rootReducer;
