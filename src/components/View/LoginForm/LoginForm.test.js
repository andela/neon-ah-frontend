import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, Form, input as Input } from 'semantic-ui-react';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import Login from './LoginForm';
import { loginUser } from '../../../action/authActions/authActions';

const preventDefault = jest.fn();
const mockOnClick = jest.fn();

const mockstore = configureStore();

const setUp = (props = {}) => {
  const component = shallow(<Login {...props} />);
  return component;
};

describe('Login Component', () => {
  describe('Testing PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        auth: { name: 'myName', food: 'myFood' },
        completeLoginLocal: () => {
          return null;
        },
        clearErrors: () => {
          return null;
        },
        history: { name: 'myName', food: 'myFood' }
      };
      const propsErr = checkProps(Login, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });
  // describe('Have Props', () => {
  //   let wrapper;
  //   beforeEach(() => {
  //     const props = {
  //       auth: { name: 'myName', food: 'myFood' },
  //       completeLoginLocal: () => {
  //         return null;
  //       },
  //       clearErrors: () => {
  //         return null;
  //       },
  //       history: { name: 'myName', food: 'myFood' }
  //     };
  //     wrapper = setUp(props);
  //   });
  //   it('Should render successfully', () => {
  //     const component = findByTestAttr(wrapper, 'LoginForm');
  //     expect(component.length).toBe(1);
  //   });
  //   it('Should render two fields', () => {
  //     const component = findByTestAttr(wrapper, 'LoginFormField');
  //     expect(component.length).toBe(2);
  //   });
  //   it('Should render button', () => {
  //     const component = findByTestAttr(wrapper, 'SubmitButton');
  //     expect(component.length).toBe(1);
  //   });
  // });
  // describe('Have No Props', () => {
  //   let wrapper;
  //   beforeEach(() => {
  //     wrapper = setUp();
  //   });
  //   it('Should not render', () => {
  //     const component = findByTestAttr(wrapper, 'LoginForm');
  //     expect(component.length).toBe(0);
  //   });
  // });
  // describe('Click functions', () => {
  //   let wrapper;
  //   beforeEach(() => {
  //     wrapper = shallow(<Login />);
  //   });
  //   it('Should successfully click submit button', () => {
  //     wrapper.find('#loginButton').simulate('click');
  //     expect(mockOnClick.mock.calls.length).toEqual(0);
  //   });
  //   it('Should successfully click submit button', () => {
  //     const mockOnClick = jest.fn();
  //     wrapper.setProps({ loginUser: 'LOGIN_USER_SUCCESS' });
  //     wrapper.find('#loginButton').simulate('click');
  //     expect(mockOnClick.mock.calls.length).toEqual(0);
  //   });
  //   it('should simulate click event on the submit button', () => {
  //     wrapper.find('#loginButton').simulate('click', {
  //       preventDefault
  //     });

  //     wrapper.setProps({ hasErrors: true });
  //     expect(wrapper.state('isValid')).toEqual(true);
  //   });
  // });
});
