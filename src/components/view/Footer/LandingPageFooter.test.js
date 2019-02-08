import React from 'react';
import { shallow } from 'enzyme';
import LandingPageFooter from './LandingPageFooter';

describe('<LandingPageFooter />', () => {
  const wrapper = shallow(<LandingPageFooter />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
