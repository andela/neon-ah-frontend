import forgotPasswordReducer from './forgotPassword.reducer';
import { ON_EMAIL_SUBMIT } from '../../action/forgotPassword/forgotPassword.action';

describe('Forgot Password Reducer', () => {
  test('Initial state for Forgot Password Reducer', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      isEmailSent: false
    };

    expect(forgotPasswordReducer(undefined, action)).toEqual(initialState);
  });

  test('Modified state for Forgot Password Reducer', () => {
    const action = { type: 'ON_EMAIL_SUBMIT', payload: '' };
    const expectedState = {
      isEmailSent: true
    };

    expect(forgotPasswordReducer(undefined, action)).toEqual(expectedState);
  });
});
