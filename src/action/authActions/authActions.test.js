import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { LOGIN_USER_SUCCESS, SHOW_ERROR, USER_LOGIN_FAILURE, loginError, loginSocial } from './authActions';
import mockLoginData from './mockLoginData';

const mockStore = configureMockStore([thunk]);
let store = mockStore();
const { successResponse, loginData } = mockLoginData;

describe('Login actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => moxios.uninstall());

  it('Returns success if login was successful', done => {
    moxios.stubRequest('/auth/login', {
      status: 200,
      response: successResponse
    });
    const expectedActions = [
      {
        loginData,
        type: LOGIN_USER_SUCCESS
      }
    ];
    store = mockStore({});
    store.dispatch({ type: LOGIN_USER_SUCCESS, loginData });
    expect(store.getActions()).toEqual(expectedActions);

    done();
  });

  it('should store in localstorage', done => {
    moxios.stubRequest('/auth/login', {
      status: 200,
      response: successResponse
    });
    const expectedActions = [
      {
        loginData,
        type: LOGIN_USER_SUCCESS
      }
    ];
    store = mockStore({});
    store.dispatch({ type: LOGIN_USER_SUCCESS, loginData });
    expect(localStorage.setItem('userToken', expectedActions));

    done();
  });

  it('should return failure if login failed', done => {
    const { errorResponse } = mockLoginData;
    moxios.stubRequest('/auth/signup', {
      status: 500,
      response: errorResponse
    });
    const expectedActions = [
      {
        type: SHOW_ERROR,
        payload: {
          errors: 'Wrong Login details',
          hasErrors: true,
          hasLoginVerification: true,
          loginRedirect: false
        }
      }
    ];
    store = mockStore({});
    store.dispatch({ type: SHOW_ERROR });
    done();
  });

  it('should return failure if login returns 422', done => {
    const { errorResponse } = mockLoginData;
    moxios.stubRequest('/auth/signup', {
      status: 422,
      response: errorResponse
    });
    const expectedActions = [
      {
        type: SHOW_ERROR,
        payload: {
          errors: 'Wrong Login details',
          hasErrors: true,
          hasLoginVerification: true,
          loginRedirect: false
        }
      }
    ];
    store = mockStore({});
    store.dispatch({ type: SHOW_ERROR });
    done();
  });

  it('should return failure if login returns 422', done => {
    const { errorResponse } = mockLoginData;
    moxios.stubRequest('/auth/signup', {
      status: 422,
      response: errorResponse
    });
    const expectedActions = [
      {
        type: SHOW_ERROR,
        payload: {
          errors: 'Wrong Login details',
          hasErrors: true,
          hasLoginVerification: true,
          loginRedirect: false
        }
      }
    ];
    store = mockStore({});
    store.dispatch({ type: SHOW_ERROR });
    done();
  });

  it('Login error should dispatch the right payload', () => {
    const message = 'Error Message';

    const expectedAction = [
      {
        payload: message,
        type: USER_LOGIN_FAILURE
      }
    ];

    store.dispatch(loginError(message));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Login success should catch error from malformed token and redirect to homepage', () => {
    const history = {
      push: jest.fn()
    };

    const expectedAction = [{ type: USER_LOGIN_FAILURE, payload: 'Cannot authenticate your account.' }];

    store.dispatch(loginSocial(history, 'malformed token'));

    expect(store.getActions()).toEqual(expectedAction);
    expect(history.push).toBeCalled();
  });
});
