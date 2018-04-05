import React from 'react';
import { TopRecipesPage, mapDispatchToProps } from '../../src/components/topRecipes/TopRecipesPage';

describe('ToprecipesPage', () => {
  it('should render ToprecipesPage', () => {
    const wrapper = shallow(<TopRecipesPage />);
    expect(wrapper).toMatchSnapshot();
  });
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('getAllRecipes');
    mdtp.getAllRecipes();
    mdtp.searchRecipes();
    expect(dispatch).toHaveBeenCalled();
  });
});
