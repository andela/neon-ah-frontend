import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as authActions from './authActions';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('AuthActions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Login error should dispatch the right payload', () => {
    const message = 'Error Message';

    const expectedAction = [
      {
        payload: message,
        type: authActions.USER_LOGIN_FAILURE
      }
    ];

    store.dispatch(authActions.loginError(message));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Login success should catch error from malformed token and redirect to homepage', () => {
    const history = {
      push: jest.fn()
    };

    const expectedAction = [{ type: authActions.USER_LOGIN_FAILURE, payload: 'Cannot authenticate your account.' }];

    store.dispatch(authActions.loginSocial(history, 'malformed token'));

    expect(store.getActions()).toEqual(expectedAction);
    expect(history.push).toBeCalled();
  });
});
