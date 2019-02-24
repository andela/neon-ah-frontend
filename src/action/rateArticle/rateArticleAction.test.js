import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockRateArticleData from './mockRateArticleData';
import * as rateArticleAction from './rateArticleAction';

const mockStore = configureMockStore([thunk]);
let store = mockStore();

describe('Rate Single Article', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('returns valid article successfully', done => {
    const { ratedResponse, slug } = mockRateArticleData;
    moxios.stubRequest(`/articles/${slug}/rating`, {
      status: 200,
      response: ratedResponse
    });

    const expectedActions = [
      {
        type: rateArticleAction.RATE_ARTICLE_SUCCESS,
        payload: {
          isLoading: false,
          article: ratedResponse
        }
      }
    ];
    store = mockStore({});

    store.dispatch(rateArticleAction.rateArticleAction(slug)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('returns rate article error successfully', done => {
    const { ratedResponse, slug } = mockRateArticleData;
    moxios.stubRequest(`/articles/${slug}/rating`, {
      status: 200,
      response: ratedResponse,
      isAuthenticated: false
    });

    const expectedActions = [
      {
        type: rateArticleAction.RATE_ARTICLE_FAILURE,
        payload: {
          isLoading: false,
          response: {
            response: {
              data: { statusCode: 200, message: 'You did not update the rating' },
              status: 'success'
            }
          }
        }
      }
    ];
    store = mockStore({});

    store.dispatch(rateArticleAction.rateArticleAction(slug)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
