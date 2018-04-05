import React from 'react';
import ProfileComponent
  from '../../src/components/profilePageComponent/ProfileComponent';

describe('ProfileComponent', () => {
  it('should render ProfileComponent', () => {
    const props = {
      currentActionType: 'My Recipes',
      currentUser: true,
      handleButtonClick: jest.fn(),
      username: 'username',
    };
    const wrapper = shallow(<ProfileComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
