import { createStore } from 'redux';

import rootReducer from './rootReducer';

const store = createStore(rootReducer);

describe('Root Reducer', () => {
  it('should return the initial auth state', () => {
    const expectedInitialAuthState = {
      isAuthenticated: false,
      roleId: '',
      loginErrors: [],
      isLoading: false
    };
    expect(store.getState().auth).toEqual(expectedInitialAuthState);
  });
});
