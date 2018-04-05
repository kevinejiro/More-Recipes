import React from 'react';
import Search from '../../src/components/common/Search';

describe('Search', () => {
  it('should render Search', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toMatchSnapshot();
  });
});
