import React from 'react';
import Reviews from '../../src/components/recipePage/Reviews';

describe('Reviews', () => {
  it('should render Reviews', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper).toMatchSnapshot();
  });
});
