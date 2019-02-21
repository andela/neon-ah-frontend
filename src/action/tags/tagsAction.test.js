import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as tagsAction from './tagsAction';
import mockData from '../forgotPassword/mockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

describe('Homepage Actions', () => {
  test('should make api call for get tags', () => {
    const mock = new MockAdapter(Axios);
    const expectedActions = [{ type: 'GET_TAG_FAILURE', payload: [] }];

    mock.onGet(`https://neon-ah-staging.herokuapp.com/api/v1/tags`).reply(200, {
      data: {
        status: 'success'
      }
    });
    const store = mockStore({
      status: ''
    });
    store.dispatch(tagsAction.getTags()).then(res => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
