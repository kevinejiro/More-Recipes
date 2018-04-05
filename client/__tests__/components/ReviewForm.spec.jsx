import React from 'react';
import { ReviewForm, mapDispatchToProps } from '../../src/components/recipePage/ReviewForm';

describe('ReviewsForm', () => {
  it('should render ReviewsForm', () => {
    const wrapper = shallow(<ReviewForm />);
    expect(wrapper).toMatchSnapshot();
  });
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('postReview');
    mdtp.postReview();
    expect(dispatch).toHaveBeenCalled();
  });
});
