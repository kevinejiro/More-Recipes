import React from 'react';
import TextField from '../../src/components/common/TextField';

describe('SignUpForm', () => {
  it('should render SignInForm', () => {
    const wrapper = shallow(<TextField />);
    expect(wrapper).toMatchSnapshot();
  });
});
