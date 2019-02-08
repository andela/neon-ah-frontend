import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../utils/testUtils';
import ArticleBanner from './ArticleBanner';

const setUp = (props = {}) => {
  const component = shallow(<ArticleBanner {...props} />);
  return component;
};

describe('Article Banner', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render one pageTopBanner element', () => {
    const wrapper = findByTestAttr(component, 'pageTopBanner');
    expect(wrapper.length).toBe(1);
  });
  it('Should render successfully', () => {
    expect(component).toMatchSnapshot();
  });
});
