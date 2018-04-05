import moxios from 'moxios';

import getSingleRecipe, {
  oneRecipeError,
  oneRecipe
} from '../../src/actions/getSingleRecipe';

import recipe from '../__mock__/recipe';
import {
  unsetLoading,
  setLoading
} from '../../src/actions/isLoading';

describe('Get one recipe', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should get one recipe', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: recipe.addRecipeResponse
      });
    });
    const expectedActions = [
      setLoading(),
      oneRecipe(recipe.getRecipeResponse),
      unsetLoading()
    ];
    const store = mockStore({});
    return store.dispatch(getSingleRecipe(9))
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
          message: 'error getting single recipe',
        }
      });
    });
    const expectedActions = [
      setLoading(),
      oneRecipeError('error getting single recipe'),
      unsetLoading()
    ];
    const store = mockStore({});

    return store.dispatch(getSingleRecipe(9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
