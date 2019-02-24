import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../../utils/testUtils';
import AuthorBreadCrumb from './AuthorBreadcrumb';

const setUp = (props = {}) => {
  const component = shallow(<AuthorBreadCrumb {...props} />);
  return component;
};

describe('Article Banner', () => {
  describe('Article Banner should render', () => {
    let component;
    beforeEach(() => {
      component = setUp();
    });
    it('Should render top authorBreadcrumb element', () => {
      const wrapper = findByTestAttr(component, 'authorBreadcrumb');
      expect(wrapper.length).toBe(0);
    });
    it('Should render successfully', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('Testing PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        src: 'gscjgsjhcks',
        authorName: 'jbscjbsjc',
        date: 'msbcmsbcmb',
        timeToRead: 2
      };
      const propsErr = checkProps(AuthorBreadCrumb, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have Props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        src: 'gscjgsjhcks',
        authorName: 'jbscjbsjc',
        date: 'msbcmsbcmb',
        timeToRead: 2
      };
      wrapper = setUp(props);
    });
    it('Should render successfully', () => {
      const component = findByTestAttr(wrapper, 'authorBreadcrumb');
      expect(component.length).toBe(0);
    });
  });
  describe('Have No Props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    });
    it('Should render for optional props', () => {
      const component = findByTestAttr(wrapper, 'authorBreadcrumb');
      expect(component.length).toBe(0);
    });
  });
});
