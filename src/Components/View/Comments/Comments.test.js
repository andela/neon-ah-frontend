import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../utils/testUtils';
import Comments from './Comments';

const setUp = (props = {}) => {
  const component = shallow(<Comments {...props} />);
  return component;
};

describe('Comments Banner', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render one comments element', () => {
    const wrapper = findByTestAttr(component, 'comments');
    expect(wrapper.length).toBe(1);
  });
  it('Should render successfully', () => {
    expect(component).toMatchSnapshot();
  });
});
