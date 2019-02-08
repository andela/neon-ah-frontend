import React from 'react';
import { shallow, mount } from 'enzyme';
import FormatMessage from './FormatMessage';

describe('Match snapshots', () => {
  it('should render succesfully', () => {
    const wrapper = shallow(<FormatMessage />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component succesfully when message is success', () => {
    const message = {
      type: 'success'
    };
    const wrapper = mount(<FormatMessage {...message} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component succesfully when message is failure', () => {
    const message = {
      type: 'failure'
    };
    const wrapper = mount(<FormatMessage {...message} />);
    expect(wrapper).toMatchSnapshot();
  });
});
