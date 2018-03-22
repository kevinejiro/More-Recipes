import moxios from 'moxios';

import addRecipe from '../../src/actions/addRecipe';
import recipe from '../__mock__/recipe';
import {
  unsetLoading,
  setLoading
} from '../../src/actions/isLoading';

describe('Add recipe', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should add recipe', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: recipe.addRecipeResponse
      });
    });
    const expectedActions = [
      setLoading(),
      unsetLoading()
    ];
    const store = mockStore({});
    return store.dispatch(addRecipe(recipe.recipeData))
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
        response: recipe.addRecipeFailure,
      });
    });
    const expectedActions = [
      setLoading(),
      unsetLoading()
    ];
    const store = mockStore({});

    return store.dispatch(addRecipe(recipe.recipeData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});

