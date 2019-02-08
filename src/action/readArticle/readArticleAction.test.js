import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockReadArticleData from './mockReadArticleData';
import * as readArticleAction from './readArticleActions';

const mockStore = configureMockStore([thunk]);
let store = mockStore();

describe('Read Single Article', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('returns valid article successfully', done => {
    const { returnedArticle, slug } = mockReadArticleData;
    moxios.stubRequest(`/articles/read/${slug}`, {
      status: 200,
      response: returnedArticle
    });

    const expectedActions = [
      {
        type: readArticleAction.READ_ARTICLE_SUCCESS,
        payload: {
          isLoading: false,
          article: returnedArticle
        }
      }
    ];
    store = mockStore({});

    store.dispatch(readArticleAction.readArticleAction(slug)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  //   it('returns valid article successfully 3', done => {
  //     const { returnedArticle, slug, payloadResponse } = mockReadArticleData;
  //     moxios.stubRequest(`/articles/read/${slug}`, {
  //       status: 200,
  //       response: payloadResponse
  //     });

  //     const expectedActions = [
  //       {
  //         type: readArticleAction.READ_ARTICLE_SUCCESS,
  //         payload: {
  //           isLoading: false,
  //           article: payloadResponse
  //         }
  //       }
  //     ];
  //     store = mockStore({});

  //     store
  //       .dispatch(readArticleAction.readArticleAction(slug))
  //       .then(
  //         store
  //           .dispatch(readArticleAction.readArticleBegin())
  //           .then(
  //             store.dispatch(readArticleAction.readArticleSuccess(payloadResponse)),
  //             expect(store.getActions()).toEqual(expectedActions)
  //           )
  //       );
  //     done();
  //   });

  //   it('returns read article success', done => {
  //     const { returnedArticle, slug, payloadResponse } = mockReadArticleData;
  //     moxios.stubRequest(`/articles/read/${slug}`, {
  //       status: 200,
  //       response: payloadResponse
  //     });
  //     const expectedActions = [
  //       {
  //         type: readArticleAction.READ_ARTICLE_SUCCESS,
  //         payload: {
  //           isLoading: false,
  //           article: payloadResponse
  //         }
  //       }
  //     ];
  //     store = mockStore({});

  //     store.dispatch(readArticleAction.readArticleSuccess(payloadResponse));
  //     expect(store.getActions()).toEqual(expectedActions);
  //     done();
  //   });

  it('should return error for non-existent articles', done => {
    const { errorResponse } = mockReadArticleData;
    moxios.stubRequest('/articles/read/notFound', {
      status: 404,
      response: errorResponse
    });

    const expectedActions = [
      {
        type: readArticleAction.READ_ARTICLE_FAILURE,
        payload: {
          isLoading: false,
          response: errorResponse.message
        }
      }
    ];
    store = mockStore({});

    store.dispatch(readArticleAction.readArticleAction('notFound')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
