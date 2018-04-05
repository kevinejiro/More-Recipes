import moxios from 'moxios';

import getAllReviews, {
  allReviews,
  allReviewsError
} from '../../src/actions/getAllReviews';

import recipe from '../__mock__/recipe';

import {
  unsetLoading,
  setLoading
} from '../../src/actions/isLoading';

describe('Get reviews', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should get all reviews', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: recipe.addRecipeResponse
      });
    });
    const expectedActions = [
      setLoading(),
      allReviews(recipe.getRecipeResponse),
      unsetLoading()
    ];
    const store = mockStore({});
    return store.dispatch(getAllReviews(9))
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
          message: 'error getting all reviews',
        }
      });
    });
    const expectedActions = [
      setLoading(),
      allReviewsError('error getting all reviews'),
      unsetLoading()
    ];
    const store = mockStore({});

    return store.dispatch(getAllReviews(9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
