import React from 'react';
import { RecipePage, mapDispatchToProps }
  from '../../src/components/recipePage/RecipePage';

describe('RecipePage', () => {
  const props = {
    recipe: jest.fn(),
    voteRecipe: jest.fn(),
    isAuthenticated: true,
    favouriteRecipe: {},
    deleteRecipe: jest.fn(),
    history: { push: jest.fn() },
    oneRecipe: { User: { username: 'somename' }, Favorites: { find: jest.fn() } },
    authUserId: '8',
    match: { params: { recipeId: '20' } }
  };
  it('should render RecipePage', () => {
    const wrapper = shallow(<RecipePage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('recipe');
    mdtp.recipe();
    mdtp.voteRecipe();
    mdtp.favouriteRecipe();
    mdtp.deleteRecipe();
    expect(dispatch).toHaveBeenCalled();
  });
});
