import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { signUpActionTypes, signUpSuccessful, signUpFailure, startUserSignUp, SignUpAction } from './signUpAction';
import mockSignUpData from './mockSignUpData';


const mockStore = configureMockStore([thunk]);
let store = mockStore();
const { successResponse, errorResponse } = mockSignUpData;


describe('Sign Up actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('dispatches success action if sign up was successful', (done) => {
    const { successResponse, signupData } = mockSignUpData;
    moxios.stubRequest('/auth/signup', {
      status: 201,
      response: successResponse
    });
    const expectedActions = [{
      type: signUpActionTypes.SIGNUP_SUCCESS,
      payload: {
        isLoading: false,
        signUpCompleted: true,
        hasSignUpError: false,
        signUpError: null,
        message: successResponse.data.message
      }
    }];
    store = mockStore({});

    store.dispatch(SignUpAction.signUpUser(signupData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('dispatches failure action if sign up failed', (done) => {
    const { errorResponse } = mockSignUpData;
    moxios.stubRequest('/auth/signup', {
      status: 500,
      response: errorResponse
    });
    const expectedActions = [{
      type: signUpActionTypes.SIGNUP_ERROR,
      payload: {
        isLoading: false,
        signUpCompleted: true,
        hasSignUpError: true,
        message: null,
        signUpError: errorResponse.message
      }
    }];
    store = mockStore({});
    store.dispatch(SignUpAction.signUpUser(""))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
 });

describe('Sign Up actions payload', () => {
  beforeEach(() => store.clearActions());

  it('dispatches startSignUp action and payload', () => {
    const expectedActions = [{
      type: signUpActionTypes.SIGNUP_USER,
      payload: {
        isLoading: true
      }
    }];

    store.dispatch(startUserSignUp())
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches signUpSuccessful action and payload', () => {
    const expectedActions = [{
      type: signUpActionTypes.SIGNUP_SUCCESS,
      payload: {
        isLoading: false,
        signUpCompleted: true,
        hasSignUpError: false,
        message: 'Kindly your check your email to verify your account',
        signUpError: null 
      }
    }];

    store.dispatch(signUpSuccessful(successResponse))
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches signUpFailure action if sign up failed', () => {
    const expectedActions = [{
      type: signUpActionTypes.SIGNUP_ERROR,
      payload: {
        isLoading: false,
        signUpCompleted: true,
        hasSignUpError: true,
        signUpError: 'Login failed',
        message: null
      }
    }];
    store.dispatch(signUpFailure(errorResponse))
    expect(store.getActions()).toEqual(expectedActions);
  });
 });

describe('User Sign Up action', () => {
  it('has an action that dispatches when sign up process has started', () => {
    const expectedAction = {
      type: signUpActionTypes.SIGNUP_USER,
      payload: {
        isLoading: true
      }
    };
    expect(expectedAction).toEqual(startUserSignUp())
  });

  it('has an action that dispatches when sign up is successful', () => {
    const expectedAction = {
      type: signUpActionTypes.SIGNUP_SUCCESS,
      payload: {
        isLoading: false,
        signUpCompleted: true,
        hasSignUpError: false,
        message: 'User signed up',
        signUpError: null,
      }
    };
    expect(expectedAction).toEqual(signUpSuccessful({ data: { message: 'User signed up' } }));
  });

  it('has an action that dispatches when sign up fails', () => {
    const expectedAction = {
      type: signUpActionTypes.SIGNUP_ERROR,
      payload: {
        isLoading: false,
        signUpCompleted: true,
        hasSignUpError: true,
        signUpError: 'Network error',
        message: null
      }
    };
    expect(expectedAction).toEqual(signUpFailure({ message: 'Network error' }))
  });
});
