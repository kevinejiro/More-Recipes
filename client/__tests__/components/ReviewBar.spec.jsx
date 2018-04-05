import React from 'react';
import { ReviewBar, mapDispatchToProps } from '../../src/components/recipePage/ReviewBar';

describe('ReviewBar', () => {
  const props = {
    allReviews: [],
    reviews: jest.fn(),
    match: { params: { recipeId: '20' } }
  };
  it('should render ReviewBar', () => {
    const wrapper = shallow(<ReviewBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('reviews');
    mdtp.reviews();
    expect(dispatch).toHaveBeenCalled();
  });
});
