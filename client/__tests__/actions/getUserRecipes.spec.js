import moxios from 'moxios';

import fetchUserRecipes, {
  fetchUserFavouriteRecipes,
  getUserRecipes,
  getUserRecipesError
} from '../../src/actions/getUserRecipes';

import recipe from '../__mock__/recipe';

import {
  unsetLoading,
  setLoading
} from '../../src/actions/isLoading';

describe('Get user recipes', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should get all user recipes ', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: recipe.addRecipeResponse
      });
    });
    const expectedActions = [
      setLoading(),
      getUserRecipes(recipe.getRecipeResponse),
      unsetLoading()
    ];
    const store = mockStore({});
    return store.dispatch(fetchUserRecipes(9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should return error for unsuccessful response', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          message: 'error getting all user recipes',
        }
      });
    });
    const expectedActions = [
      setLoading(),
      getUserRecipesError('error getting all user recipes'),
      unsetLoading()
    ];
    const store = mockStore({});

    return store.dispatch(fetchUserRecipes(9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should get all user favorites ', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: recipe.addRecipeResponse
      });
    });
    const expectedActions = [
      setLoading(),
      getUserRecipes(recipe.getRecipeResponse),
      unsetLoading()
    ];
    const store = mockStore({});
    return store.dispatch(fetchUserFavouriteRecipes(9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should return error for unsuccessful response', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          message: 'error getting all user favorities',
        }
      });
    });
    const expectedActions = [
      setLoading(),
      getUserRecipesError('error getting all user favorities'),
      unsetLoading()
    ];
    const store = mockStore({});

    return store.dispatch(fetchUserFavouriteRecipes(9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
