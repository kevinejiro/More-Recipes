import React from 'react';
import { ProfilePage, mapDispatchToProps } from '../../src/components/profilePageComponent/ProfilePage';

describe('ProfilePage', () => {
  it('should render ProfilePage', () => {
    const wrapper = shallow(<ProfilePage />);
    expect(wrapper).toMatchSnapshot();
  });
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mdtp = mapDispatchToProps(dispatch);
    expect(mdtp).toHaveProperty('userRecipes');
    mdtp.userRecipes();
    mdtp.getFavouriteRecipes();
    expect(dispatch).toHaveBeenCalled();
  });
});
