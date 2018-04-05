import React from 'react';
import { AddRecipeForm, mapDispatchToProps }
  from '../../src/components/profilePageComponent/AddRecipeForm';

describe('AddRecipeForm', () => {
  it('should render AddRecipeForm', () => {
    global.firebase = {
      storage: () => ({
        ref: jest.fn()
      })
    };
    const wrapper = shallow(<AddRecipeForm />);
    expect(wrapper).toMatchSnapshot();
  });
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('addRecipe');
    mdtp.addRecipe();
    expect(dispatch).toHaveBeenCalled();
  });
});
