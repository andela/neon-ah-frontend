import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import EmailConfirmation from './EmailVerification';

const wrapper = shallow(<EmailConfirmation />);

describe('Render ForgotPasswordForm ', () => {
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ForgotPasswordForm', () => {
  const props = {
    history: { push: jest.fn() },
    isEmailSent: true,
    onEmailSubmit: () => jest.fn()
  };
  const store = {
    getState: () => {
      return {
        sendEmailReducer: {
          isEmailSent: false
        },
        signUpReducer: {
          isLoading: false,
          signUpCompleted: false,
          hasSignUpError: false,
          signUpError: null,
          message: null
        }
      };
    },
    subscribe: () => {
      return store.getState();
    },
    dispatch: () => {}
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <EmailConfirmation {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('should render component successfully', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should simulate handling form submit', () => {
    const preventDefault = jest.fn();
    wrapper.setProps({ sendUserEmail: jest.fn('email'), isEmailSent: false });
    wrapper.find('Form').simulate('submit', { preventDefault });
    expect(preventDefault.mock.calls.length).toEqual(2);
  });
});
