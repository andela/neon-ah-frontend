import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, Form, input as Input } from 'semantic-ui-react';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import Login from './LoginForm';
import { loginUser, loginError, clearLoginErrors } from '../../../action/authActions/authActions';

const preventDefault = jest.fn();
const mockOnClick = jest.fn();

const mockstore = configureStore();

const setUp = (props = {}) => {
  const component = shallow(<Login {...props} />);
  return component;
};

describe('Login Component', () => {
  describe('Snapshot', () => {
    const wrapper = shallow(<Login />);
    it('should render successfully', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
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
});
