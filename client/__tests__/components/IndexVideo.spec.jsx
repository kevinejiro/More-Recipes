import React from 'react';
import IndexVideo from '../../src/components/indexPage/IndexVideo';

describe('IndexVideo', () => {
  it('should render IndexVideo', () => {
    const wrapper = shallow(<IndexVideo />);
    expect(wrapper).toMatchSnapshot();
  });
});
