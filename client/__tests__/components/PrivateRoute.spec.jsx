import React from 'react';
import PrivateRoute from '../../src/components/common/PrivateRoute';

describe('PrivateRoute', () => {
  it('should render PrivateRoute', () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
