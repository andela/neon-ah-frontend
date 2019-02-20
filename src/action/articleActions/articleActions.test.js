import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as articleActions from './articleActions';
import { apiInstance } from '../../utils/axiosSetup';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('articleActions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('CREATING_ARTICLE should return the right payload', () => {
    const expectedAction = [
      {
        payload: true,
        type: articleActions.CREATING_ARTICLE
      }
    ];

    store.dispatch(articleActions.creatingArticle(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('CREATE_ARTICLE_FAILURE should return the right payload', () => {
    const expectedErrorMessage = ['Error from the database'];
    const expectedAction = [
      {
        payload: expectedErrorMessage,
        type: articleActions.CREATE_ARTICLE_FAILURE
      }
    ];

    store.dispatch(articleActions.createArticleFailure(expectedErrorMessage));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('CREATE_ARTICLE_SUCCESS should return the right payload', () => {
    const mockPayload = { data: { payload: { user: 'Jesse' } } };

    mock.onPost('/articles').reply(200, mockPayload);

    const history = {
      push: () => jest.fn()
    };

    const articleData = {
      articleTitle: 'Article Title',
      articleBody: "We're Killing them Sha",
      bannerUrl: 'http://example.com/sampleUrl.jpg',
      tags: [{ text: 'SampleTag' }]
    };

    const expectedAction = [
      {
        payload: true,
        type: articleActions.CREATING_ARTICLE
      },
      {
        type: articleActions.CREATE_ARTICLE_SUCCESS,
        payload: mockPayload.data.payload
      }
    ];

    store.dispatch(articleActions.createArticle(articleData, history)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('CREATE_ARTICLE_FAILURE should handle input errors', () => {
    const mockPayload = { data: { error: [{ text: 'Error from creating article' }] } };

    mock.onPost('/articles').reply(400, mockPayload);

    const articleData = {
      articleTitle: 'Article Title',
      articleBody: "We're Killing them Sha",
      bannerUrl: 'http://example.com/sampleUrl.jpg',
      tags: [{ text: 'SampleTag' }]
    };

    const expectedAction = [
      {
        payload: true,
        type: articleActions.CREATING_ARTICLE
      },
      {
        type: articleActions.CREATE_ARTICLE_FAILURE,
        payload: ['Error from creating article']
      }
    ];

    store.dispatch(articleActions.createArticle(articleData, history)).catch(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('CREATE_ARTICLE_FAILURE should handle unexpected errors', () => {
    const mockPayload = { data: { error: [{ text: 'Error from creating article' }] } };

    mock.onPost('/articles').reply(500, mockPayload);

    const articleData = {
      articleTitle: 'Article Title',
      articleBody: "We're Killing them Sha",
      bannerUrl: 'http://example.com/sampleUrl.jpg',
      tags: [{ text: 'SampleTag' }]
    };

    const expectedAction = [
      {
        payload: true,
        type: articleActions.CREATING_ARTICLE
      },
      {
        type: articleActions.CREATE_ARTICLE_FAILURE,
        payload: ['Error from creating article']
      }
    ];

    store.dispatch(articleActions.createArticle(articleData, history)).catch(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
