import React from 'react';
import { Header, mapDispatchToProps } from '../../src/components/Header';

describe('Header', () => {
  it('should render Header', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('signOutUser');
    mdtp.signOutUser();
    expect(dispatch).toHaveBeenCalled();
  });
});

