import React from 'react';
import { SignUpForm } from '../../src/components/pages/SignUpForm';

describe('SignUpForm', () => {
  it('should render SignInForm', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
