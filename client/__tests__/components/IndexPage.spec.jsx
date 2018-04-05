import React from 'react';
import IndexPage from '../../src/components/pages/IndexPage';

describe('IndexPage', () => {
  it('should render IndexPage', () => {
    const wrapper = shallow(<IndexPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
