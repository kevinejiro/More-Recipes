import React from 'react';
import Jumbotron from '../../src/components/common/Jumbotron';

describe('Jumbotron component', () => {
  it('should render Jumbotron component', () => {
    const wrapper = shallow(<Jumbotron
      heading="Jumbotron heading"
      jumbotronText="jumbotron Text" />);
    expect(wrapper).toMatchSnapshot();
  });
});
