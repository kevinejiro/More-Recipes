import moxios from 'moxios';

import editRecipe from '../../src/actions/editRecipe';
import recipe from '../__mock__/recipe';
import {
  unsetLoading,
  setLoading
} from '../../src/actions/isLoading';

describe('Edit recipe', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should edit a recipe', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: recipe.editRecipeResponse
      });
    });
    const expectedActions = [
      setLoading(),
      unsetLoading()
    ];
    const store = mockStore({});
    return store.dispatch(editRecipe(recipe.recipeData, 4))
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

    return store.dispatch(editRecipe(recipe.recipeData, 7))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
