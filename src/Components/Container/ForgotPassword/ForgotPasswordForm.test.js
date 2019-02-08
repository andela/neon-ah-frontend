import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import ForgotPasswordForm from './ForgotPasswordForm';

describe('Render ForgotPasswordForm ', () => {
  const wrapper = shallow(<ForgotPasswordForm />);

  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ForgotPasswordForm', () => {
  const props = {
    isEmailSent: true
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
        <ForgotPasswordForm {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('should render component successfully', () => {
    expect(wrapper).toBeTruthy();
  });
});
