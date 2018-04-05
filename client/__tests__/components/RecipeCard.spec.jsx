import React from 'react';
import RecipeCard from '../../src/components/common/RecipeCard';

describe('RecipeCard', () => {
  it('should render RecipeCard', () => {
    const props = {
      description: 'mock description',
      id: 1,
      imgUrl: 'mock image location',
      title: 'mock title'
    };
    const wrapper = shallow(<RecipeCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
