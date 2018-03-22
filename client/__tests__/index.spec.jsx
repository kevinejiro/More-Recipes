import React from 'react';


import Main from '../src/routes';

describe('Routes', () => {
  test('should render routes', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.length).toBe(1);
  });
});
