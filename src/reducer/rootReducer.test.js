import { createStore } from 'redux';

import rootReducer from './rootReducer';

const store = createStore(rootReducer);

describe('Root Reducer', () => {
  it('should return the initial auth state', () => {
    const expectedInitialAuthState = undefined;
    expect(store.getState().auth).toEqual(expectedInitialAuthState);
  });
});
