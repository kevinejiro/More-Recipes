import React from 'react';
import RecipeComponent from '../../src/components/profilePageComponent/RecipeComponent';

describe('RecipeComponent', () => {
  it('should render RecipeComponent', () => {
    const wrapper = shallow(<RecipeComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
