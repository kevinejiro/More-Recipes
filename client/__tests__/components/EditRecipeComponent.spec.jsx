import React from 'react';
import EditRecipeComponent from '../../src/components/recipePage/EditRecipeComponent';

describe('EditRecipeComponent', () => {
  it('should render EditRecipeComponent', () => {
    const wrapper = shallow(<EditRecipeComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
