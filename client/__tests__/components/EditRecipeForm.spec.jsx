import React from 'react';
import { EditRecipeForm, mapDispatchToProps }
  from '../../src/components/recipePage/EditRecipeForm';

describe('EditRecipeForm', () => {
  it('should render EditRecipeForm', () => {
    const wrapper = shallow(<EditRecipeForm />);
    expect(wrapper).toMatchSnapshot();
  });
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('editRecipe');
    mdtp.editRecipe();
    expect(dispatch).toHaveBeenCalled();
  });
});
