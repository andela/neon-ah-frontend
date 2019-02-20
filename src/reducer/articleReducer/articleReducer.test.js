import articleReducer from './articleReducer';
import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  CREATING_ARTICLE
} from '../../action/articleActions/articleActions';

describe('articleReducer', () => {
  const initialState = {
    isCreating: false,
    articleErrors: [],
    createdArticle: {}
  };

  test('should return initial state when unmatched action is dispatched', () => {
    expect(articleReducer(undefined, { type: 'UNDEFINED_ACTION' })).toEqual(initialState);
  });

  test('should return the expected state when CREATE_ARTICLE_FAILURE action is dispatched', () => {
    const action = { type: CREATE_ARTICLE_FAILURE, payload: ['Article Creation Error'] };

    const expectedState = {
      isCreating: false,
      articleErrors: ['Article Creation Error'],
      createdArticle: {}
    };

    expect(articleReducer(initialState, action)).toEqual(expectedState);
  });

  test('should return the expected state when CREATE_ARTICLE_SUCCESS action is dispatched', () => {
    const action = { type: CREATE_ARTICLE_SUCCESS, payload: { id: 1234567890, slug: 'hello-world-xs1234' } };

    const expectedState = {
      isCreating: false,
      articleErrors: [],
      createdArticle: { ...action.payload }
    };

    expect(articleReducer(initialState, action)).toEqual(expectedState);
  });

  test('should return the expected state when CREATING_ARTICLE action is dispatched', () => {
    const action = { type: CREATING_ARTICLE, payload: true };

    const expectedState = {
      isCreating: true,
      articleErrors: [],
      createdArticle: {}
    };

    expect(articleReducer(initialState, action)).toEqual(expectedState);
  });
});
