import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as emailVerificationActions from './emailVerificationAction';
import mockData from '../forgotPassword/mockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

describe('Forgot Password Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('Message should equal the right value', () => {
    const action = emailVerificationActions.UPDATE_STATUS_CODE;
    expect(action).toEqual('UPDATE_STATUS_CODE');
  });

  test('Dispatches the correct action and payload when an error is thrown', () => {
    const expectedActions = [
      {
        type: 'UPDATE_STATUS_CODE',
        payload: 'token'
      }
    ];

    store.dispatch(emailVerificationActions.updateStatus('token'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and payload when a success response is return', () => {
    const { forgotPasswordData } = mockData;
    const mock = new MockAdapter(Axios);
    mock
      .onPost('https://neon-ah-staging.herokuapp.com/api/v1/auth/resend-verification-link', {
        email: forgotPasswordData.email
      })
      .reply(500);

    const expectedActions = [
      {
        type: 'ON_EMAIL_SUBMIT'
      }
    ];
    const store = mockStore({
      isEmailSent: false
    });
    store.dispatch(emailVerificationActions.sendConfirmationMailApiCall(mockData.forgotPasswordData.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should make api call for forgot password', () => {
    const { forgotPasswordData } = mockData;
    const mock = new MockAdapter(Axios);
    mock
      .onPost('https://neon-ah-staging.herokuapp.com/api/v1/auth/resend-verification-link', {
        email: forgotPasswordData.email
      })
      .reply(200);

    const expectedActions = [
      {
        type: 'ON_EMAIL_SUBMIT'
      }
    ];
    const store = mockStore({
      isEmailSent: false
    });
    store.dispatch(emailVerificationActions.sendConfirmationMailApiCall(mockData.forgotPasswordData.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should make api call for forgot password', () => {
    const { token } = mockData;
    const mock = new MockAdapter(Axios);
    const history = () => {};
    mock.onPost(`https://neon-ah-staging.herokuapp.com/api/v1/auth/verify/${token}`).reply(500, {
      data: {
        status: 'failure'
      }
    });
    const store = mockStore({
      status: ''
    });
    store.dispatch(emailVerificationActions.verifyUserApiCall(token, history)).then(res => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
