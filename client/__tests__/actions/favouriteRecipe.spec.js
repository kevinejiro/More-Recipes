import moxios from 'moxios';

import favouriteRecipe from '../../src/actions/favouriteRecipe';
import recipe from '../__mock__/recipe';
import {
  unsetLoading,
  setLoading
} from '../../src/actions/isLoading';

describe('favourite a recipe', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should favourite a recipe', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'pass',
          message: 'Recipe have been added to your favorites'
        }
      });
    });
    const expectedActions = [
      setLoading(),
      unsetLoading()
    ];
    const store = mockStore({});
    return store.dispatch(favouriteRecipe(6))
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
          message: recipe.favouriteRecipeFailure,
        }
      });
    });
    const expectedActions = [
      setLoading(),
      unsetLoading()
    ];
    const store = mockStore({});

    return store.dispatch(favouriteRecipe(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
