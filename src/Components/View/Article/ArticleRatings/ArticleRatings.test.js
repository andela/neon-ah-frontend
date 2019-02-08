import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../utils/testUtils';
import ArticleRatings from './ArticleRatings';

const setUp = (props = {}) => {
  const component = shallow(<ArticleRatings {...props} />);
  return component;
};

describe('Article Ratings', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render one ArticleRating element', () => {
    const wrapper = findByTestAttr(component, 'ArticleRating');
    expect(wrapper.length).toBe(1);
  });
  it('Should render successfully', () => {
    expect(component).toMatchSnapshot();
  });
});
