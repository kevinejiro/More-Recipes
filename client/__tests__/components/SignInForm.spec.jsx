import React from 'react';
import { SignInForm } from '../../src/components/pages/SignInForm';

describe('SignInForm', () => {
  it('should render SignInForm', () => {
    const wrapper = shallow(<SignInForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
