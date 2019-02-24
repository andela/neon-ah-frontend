import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockUserBookmarkData from './mockUserBookmarkData';
import * as getUserBookmark from './getUserBookmarksActions';

const mockStore = configureMockStore([thunk]);
let store = mockStore();

describe('Read Single Article', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('returns valid article successfully', done => {
    const { returnedArticle, slug } = mockUserBookmarkData;
    moxios.stubRequest(`/user/bookmarks`, {
      status: 200,
      response: returnedArticle
    });

    const expectedActions = [
      {
        type: getUserBookmark.GET_ALL_BOOKMARKS,
        payload: {
          isLoading: false,
          bookmarks: returnedArticle
        }
      }
    ];
    store = mockStore({});

    store.dispatch(getUserBookmark.getUserBookmarkActions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should return error for non-existent articles', done => {
    const { errorResponse } = mockUserBookmarkData;
    moxios.stubRequest('/user/bookmark', {
      status: 404,
      response: errorResponse
    });

    const expectedActions = [
      {
        type: getUserBookmark.READ_ARTICLE_FAILURE,
        payload: {
          isLoading: false,
          response: errorResponse.message
        }
      }
    ];
    store = mockStore({});

    store.dispatch(getUserBookmark.getUserBookmarkActions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
