import React from 'react';
import {
  Route,
} from 'react-router-dom';

import App from './components/App';
import IndexPage from './components/pages/IndexPage';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import TopRecipes from './components/topRecipes/TopRecipesPage';
import RecipePage from './components/recipePage/RecipePage';
import ProfilePage from './components/profilePageComponent/ProfilePage';

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
    <Route
      exact
      component={RecipePage}
      path="/recipes/:recipeId"
    />
    <Route
      exact
      component={ProfilePage}
      path="/dashboard"
    />
    <Route
      exact
      component={ProfilePage}
      path="/user/:userId"
    />
  </App>
);

export default Main;
