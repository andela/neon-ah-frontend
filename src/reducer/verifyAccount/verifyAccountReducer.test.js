import accountVerifyReducer from './verifyAccountReducer';

describe('Forgot Password Reducer', () => {
  test('Initial state', () => {
    const action = { type: 'UPDATE_STATUS_CODE', payload: '' };
    const initialState = {
      statusCode: ''
    };

    expect(accountVerifyReducer(undefined, action)).toEqual(initialState);
  });

  test('Initial state', () => {
    const action = { type: 'UPDATE_STATUS_CODE', payload: 500 };
    const expectedState = {
      statusCode: 500
    };

    expect(accountVerifyReducer(undefined, action)).toEqual(expectedState);
  });
});
