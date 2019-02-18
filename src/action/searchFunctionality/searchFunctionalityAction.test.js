import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as searchFunctionalityActions from './searchFunctionalityAction';
import mockData from '../forgotPassword/mockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

describe('Forgot Password Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('Message should equal the right value', () => {
    const action = searchFunctionalityActions.GET_BOOKMARK_FAILURE;
    expect(action).toEqual('GET_BOOKMARK_FAILURE');
  });

  test('Dispatches the correct action and payload when an error is thrown', () => {
    const expectedActions = [
      {
        type: 'UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS',
        payload: { statusCode: 200, data: [] }
      }
    ];

    store.dispatch(searchFunctionalityActions.updateWithArticleTagOrAuthor(200, []));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and payload when a success response is return', () => {
    const mock = new MockAdapter(Axios);
    mock
      .onGet('https://neon-ah-staging.herokuapp.com/api/v1/users/jesseinit/following', {})
      .reply(200, { data: { message: 'jesseinit currently has no following' } });

    const expectedActions = [{ type: 'GET_FOLLOWING_SUCCESS', payload: [] }];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.getfollowingAuthorApiCall('jesseinit')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action and payload when a success response is return', () => {
    const { forgotPasswordData } = mockData;
    const mock = new MockAdapter(Axios);
    mock
      .onGet('https://neon-ah-staging.herokuapp.com/api/v1/users/jesseinit/following', {})
      .reply(200, { data: { message: 'success', payload: { following: [] } } });

    const expectedActions = [{ type: 'GET_FOLLOWING_SUCCESS', payload: [] }];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.getfollowingAuthorApiCall('jesseinit')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action and payload when a success response is return', () => {
    const { forgotPasswordData } = mockData;
    const mock = new MockAdapter(Axios);
    mock
      .onGet('https://neon-ah-staging.herokuapp.com/api/v1/users/jesseinit/following', {})
      .reply(400, { data: { message: 'success', payload: { following: [] } } });

    const expectedActions = [{ type: 'GET_FOLLOWING_FAILURE', payload: [] }];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.getfollowingAuthorApiCall('jesseinit')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action and payload when a success response is return', () => {
    const { forgotPasswordData } = mockData;
    const mock = new MockAdapter(Axios);
    mock
      .onPost('https://neon-ah-staging.herokuapp.com/api/v1/users/jesseinit/follow', {})
      .reply(200, { decode: { userName: 'jesseinit' } });

    const expectedActions = [{ type: 'GET_FOLLOWING_SUCCESS', payload: [] }];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.followAnAuthorApiCall('jesseinit')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action and payload when a success response is return', () => {
    const mock = new MockAdapter(Axios);
    mock
      .onGet('https://neon-ah-staging.herokuapp.com/api/v1/user/bookmarks', {})
      .reply(200, { data: { message: 'You have not bookmarked any article yet' } });

    const expectedActions = [{ type: 'GET_BOOKMARK_SUCCESS', payload: [] }];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.getUserBookmarkApiCall()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action and payload when a success response is return', () => {
    const mock = new MockAdapter(Axios);
    mock
      .onGet('https://neon-ah-staging.herokuapp.com/api/v1/user/bookmarks', {})
      .reply(200, { data: { message: 'success', payload: { bookmarks: [] } } });

    const expectedActions = [{ type: 'GET_BOOKMARK_SUCCESS', payload: [] }];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.getUserBookmarkApiCall()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  test('Dispatches the correct action and payload when a success response is return', () => {
    const mock = new MockAdapter(Axios);
    mock
      .onGet('https://neon-ah-staging.herokuapp.com/api/v1/user/bookmarks', {})
      .reply(400, { data: { message: 'success', payload: [] } });

    const expectedActions = [{ type: 'GET_BOOKMARK_FAILURE', payload: [] }];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.getUserBookmarkApiCall()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  test('Dispatches the correct action and payload when a success response is return', () => {
    const mock = new MockAdapter(Axios);
    mock.onPost('https://neon-ah-staging.herokuapp.com/api/v1/articles/bookmark/bookmark', {}).reply(200);

    const expectedActions = [];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.bookmarkArticleApiCall('bookmark')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  test('Dispatches the correct action and payload when a success response is return', () => {
    const mock = new MockAdapter(Axios);
    mock.onGet('https://neon-ah-staging.herokuapp.com/api/v1/search?author=s', {}).reply(200, {
      data: { statusCode: 200, payload: { articles: [] } }
    });

    const expectedActions = [
      { type: 'GET_BOOKMARK_FAILURE', payload: [] },
      { type: 'UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS', payload: { statusCode: 200, data: { articles: [] } } }
    ];
    const store = mockStore({
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      following: []
    });
    store.dispatch(searchFunctionalityActions.searchByOptionApiCall('author', 's')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
