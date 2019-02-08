import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../utils/testUtils';
import SocialIcons from './SocialIcons';

const setUp = (props = {}) => {
  const component = shallow(<SocialIcons {...props} />);
  return component;
};

describe('Social Icons', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render one socialIcons element', () => {
    const wrapper = findByTestAttr(component, 'socialIcons');
    expect(wrapper.length).toBe(1);
  });
  it('Should render successfully', () => {
    expect(component).toMatchSnapshot();
  });
});
