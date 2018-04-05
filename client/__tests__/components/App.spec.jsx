import React from 'react';
import { App, mapDispatchToProps } from '../../src/components/App';

describe('App', () => {
  it('should render App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  test('calls componentWillUpdate', () => {
    const wrapper = shallow(<App />);
    const cwup = jest.spyOn(wrapper.instance(), 'componentWillUpdate');
    wrapper.instance().setState({ newState: '' });
    expect(cwup).toHaveBeenCalled();
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('signOutUser');
    mdtp.signOutUser();
    expect(dispatch).toHaveBeenCalled();
  });
});
