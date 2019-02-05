import placeholderReducer from './placeholder';

describe('INITIAL_STATE', () => {
  it('should return the initial state', () => {
    const action = { type: null };
    expect(placeholderReducer(undefined, action)).toEqual({});
  });

  it('should return the updated state if it matches the given action', () => {
    const action = {
      type: 'TEST_REDUX',
      payload: 'Set up redux'
    };

    expect(placeholderReducer(undefined, action)).toEqual({ payload: 'Set up redux'});
  });
});
