import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as homePageAction from './homePageAction';
import mockData from '../forgotPassword/mockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

describe('Homepage Actions', () => {
  test('should make api call for get article', () => {
    const mock = new MockAdapter(Axios);
    const expectedActions = [{ type: 'GET_HOMEPAGE_ARTICLE_SUCCESS', payload: [] }];

    mock.onGet(`https://neon-ah-staging.herokuapp.com/api/v1/articles`).reply(200, {
      data: {
        status: 'success'
      }
    });
    const store = mockStore({
      status: ''
    });
    store.dispatch(homePageAction.getHomePageArticles()).then(res => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
