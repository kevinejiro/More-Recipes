import React from 'react';
import {
  Route,
} from 'react-router-dom';

import App from './components/App';
import IndexPage from './components/pages/IndexPage';
import BrowsePage from './components/pages/BrowsePage';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import TopRecipes from './components/topRecipes/TopRecipesPage';
/**
 * @returns {JSX} jsx
 */
const Main = () => (
  <App>
    <Route
      exact
      component={IndexPage}
      path="/"
    />
    <Route
      exact
      component={BrowsePage}
      path="/browse"
    />
    <Route
      exact
      component={SignUp}
      path="/signup"
    />
    <Route
      exact
      component={SignIn}
      path="/signin"
    />
    <Route
      exact
      component={TopRecipes}
      path="/toprecipes"
    />
  </App>
);

export default Main;
