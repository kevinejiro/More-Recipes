import moxios from 'moxios';

import getAllRecipes, {
  allrecipes,
  loadRecipesSucess,
  allrecipesError
} from '../../src/actions/getAllRecipes';

import recipe from '../__mock__/recipe';
import {
  unsetLoading,
  setLoading
} from '../../src/actions/isLoading';

describe('get recipes', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should get all recipes', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: recipe.getRecipeResponse
      });
    });
    const expectedActions = [
      setLoading(),
      loadRecipesSucess(recipe.getRecipeResponse),
      unsetLoading()

    ];
    const store = mockStore({});
    return store.dispatch(getAllRecipes(3, 4))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should return error for unsuccessful response', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'error getting all recipes',
        }
      });
    });
    const expectedActions = [
      setLoading(),
      allrecipesError('error getting all recipes'),
      unsetLoading()
    ];
    const store = mockStore({});

    return store.dispatch(getAllRecipes(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
