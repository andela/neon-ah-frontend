import React from 'react';
import { shallow, mount } from 'enzyme';
import ForgotPassword from './ForgotPassword';

describe('<ForgotPassword />', () => {
  it('should render succesfully', () => {
    const wrapper = shallow(<ForgotPassword />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate input change', () => {
    const wrapper = mount(<ForgotPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
