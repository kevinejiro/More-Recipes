import React from 'react';
import SignIn from '../../src/components/pages/SignIn';

describe('SignIn', () => {
  it('should render SignIn', () => {
    const wrapper = shallow(<SignIn />);
    expect(wrapper).toMatchSnapshot();
  });
});
