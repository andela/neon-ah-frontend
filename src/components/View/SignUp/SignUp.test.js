import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../SignUp/SignUp';

const signUpUser = jest.fn();
const wrap = shallow(<SignUp triggerEl={<p>Click</p>} signUpUser={signUpUser} />);
const preventDefault = jest.fn();

wrap.setProps({ signUpUser });

describe('<SignUp />', () => {
  it('renders the component successfully', () => {
    expect(wrap).toMatchSnapshot();
  });

  it('should update the state when input fields change', () => {
    wrap.find('#email').simulate('change', {
      preventDefault,
      target: { value: 'john@email.com', id: 'email' }
    });
    wrap.find('#password').simulate('change', {
      target: { value: 'asdfghjk', id: 'password' },
      preventDefault
    });

    expect(wrap.state('inputFieldsData').email).toEqual('john@email.com');
    expect(wrap.state('inputFieldsData').password).toEqual('asdfghjk');
  });

  it('should simulate click event on the submit button', () => {
    wrap.find('#signup-form').simulate('submit', {
      preventDefault
    });

    expect(wrap.state('hasValidationError')).toEqual(true);
  });

  it('should submit for if input are valid', () => {
    wrap.setState({
        hasValidationError: false,
        inputFieldsData: {
          fullName: 'Andela Nigeria',
          userName: 'Tia001',
          email: 'tia@andela.com',
          password: 'asdfghj',
          confirmPassword: 'asdfghj'
      }
    });
    wrap.find('#signup-form').simulate('submit', {
      preventDefault
    });

    expect(signUpUser.mock.calls.length).toEqual(1);
  });
});
