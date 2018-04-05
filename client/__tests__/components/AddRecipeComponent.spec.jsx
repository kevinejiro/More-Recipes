import React from 'react';
import AddRecipeComponent from '../../src/components/profilePageComponent/AddRecipeComponent';

describe('AddRecipeComponent', () => {
  it('should render AddRecipeComponent', () => {
    const wrapper = shallow(<AddRecipeComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
