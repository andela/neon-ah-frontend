import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as readStatsAction from './readStatsAction';
import mockData from '../forgotPassword/mockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

describe('READ STATS Actions', () => {
  test('should make api call for get stats', () => {
    const mock = new MockAdapter(Axios);
    const expectedActions = [{ type: 'GET_READ_STATS_SUCCESS', payload: [] }];

    mock.onGet(`https://neon-ah-staging.herokuapp.com/api/v1/stats`).reply(200, {
      data: {
        status: 'success'
      }
    });
    const store = mockStore({
      status: ''
    });
    store.dispatch(readStatsAction.getReadStats()).then(res => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
