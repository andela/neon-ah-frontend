import reducer from './signUpReducer';

const initialState = {
  isLoading: false,
  signUpCompleted: false,
  hasSignUpError: false,
  signUpError: null,
  message: null
};

describe('Sign Up Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles sign up request', () => {
    const payload = {
      isLoading: true
    };

    expect(reducer(initialState, { type: 'SIGNUP_USER', payload })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('handles sign up failure', () => {
    const payload = {
      isLoading: false,
      signUpCompleted: true,
      hasSignUpError: true,
      signUpError: 'Network error'
    };

    expect(reducer(initialState, { type: 'SIGNUP_ERROR', payload })).toEqual({
      ...initialState,
      ...payload
    });
  });

  it('handles successful sign up', () => {
    const payload = {
      isLoading: false,
      signUpCompleted: true,
      hasSignUpError: false,
      signUpError: null,
      message: 'User signed up'
    };

    expect(
      reducer(initialState, {
        type: 'SIGNUP_SUCCESS',
        payload
      })
    ).toEqual({
      ...initialState,
      ...payload
    });
  });
});
