import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from './LandingPage';

const wrapper = shallow(<LandingPage />);

describe('<LandingPage />', () => {
  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
