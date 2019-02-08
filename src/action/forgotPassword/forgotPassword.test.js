import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from './mockData';
import * as forgotPasswordAction from './forgotPassword.action';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

describe('Forgot Password Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('Message should equal the right value', () => {
    const action = forgotPasswordAction.ERROR_OR_SUCCESS;
    expect(action).toEqual('ERROR_OR_SUCCESS');
  });

  test('ON_EMAIL_SUBMIT should equal the right value', () => {
    const action = forgotPasswordAction.ON_EMAIL_SUBMIT;
    expect(action).toEqual('ON_EMAIL_SUBMIT');
  });

  test('Dispatches the correct action and payload for email submit', () => {
    const expectedActions = [
      {
        payload: { error: '' },
        type: 'ON_EMAIL_SUBMIT'
      }
    ];

    store.dispatch(forgotPasswordAction.onEmailSubmit());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('should make api call for forgot password', () => {
    const { authResponse, forgotPasswordData } = mockData;
    const mock = new MockAdapter(Axios);
    mock
      .onPost('https://neon-ah-staging.herokuapp.com/api/v1/password/forgot', {
        email: mockData.forgotPasswordData.email
      })
      .reply(authResponse);

    const expectedActions = [
      {
        payload: { error: '' },
        type: 'ON_EMAIL_SUBMIT'
      }
    ];
    const store = mockStore({
      isEmailSent: false
    });
    store.dispatch(forgotPasswordAction.asyncForgotPasswordApiCall(mockData.forgotPasswordData.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should make api call for forgot password', () => {
    const { authResponse, forgotPasswordData, token, newPassword, confirmPassword } = mockData;
    const mock = new MockAdapter(Axios);
    mock
      .onPost(`https://neon-ah-staging.herokuapp.com/api/v1/password/reset/${token}`, {
        newPassword,
        confirmPassword
      })
      .reply(authResponse);

    const expectedActions = [{ type: 'ON_EMAIL_SUBMIT', payload: { error: '' } }];
    const store = mockStore({
      message: {}
    });
    store.dispatch(forgotPasswordAction.asyncResetPasswordApiCall(newPassword, confirmPassword, token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
