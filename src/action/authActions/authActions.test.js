import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { LOGIN_USER_SUCCESS, SHOW_ERROR, loginUser } from './authActions';
import mockLoginData from './mockLoginData';

const mockStore = configureMockStore([thunk]);
let store = mockStore();
const { successResponse, errorResponse } = mockLoginData;

describe('Login actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Returns success if login was successful', done => {
    const { successResponse, loginData } = mockLoginData;
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
    const { successResponse, loginData } = mockLoginData;
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
});
