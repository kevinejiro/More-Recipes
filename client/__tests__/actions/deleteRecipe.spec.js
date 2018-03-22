import moxios from 'moxios';

import deleteRecipe from '../../src/actions/deleteRecipe';
import recipe from '../__mock__/recipe';
import {
  unsetLoading,
  setLoading
} from '../../src/actions/isLoading';

describe('Delete recipe', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should delete a recipe', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'pass',
          message: 'Recipe was deleted successfully'
        }
      });
    });
    const expectedActions = [
      setLoading(),
      unsetLoading()
    ];
    const store = mockStore({});
    return store.dispatch(deleteRecipe(6))
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
          message: recipe.deleteRecipeFailure,
        }
      });
    });
    const expectedActions = [
      setLoading(),
      unsetLoading()
    ];
    const store = mockStore({});

    return store.dispatch(deleteRecipe(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
