import React from 'react';
import SignUp from '../../src/components/pages/SignUp';

describe('SignUp', () => {
  it('should render SignUp', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper).toMatchSnapshot();
  });
});
