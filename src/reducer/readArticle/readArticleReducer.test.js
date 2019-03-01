import readArticleReducer, { initialArticleState } from './readArticleReducer';

describe('Read Article reducer', () => {
  const expectedSuccessState = {
    isLoading: false,
    article: {},
    message: '',
    response: {},
    authorImage: null,
    userName: null
  };
  const expectedFailureState = {
    article: {},
    message: '',
    isLoading: false,
    response: {},
    authorImage: null,
    userName: null
  };
  it('Should return initial state', () => {
    const action = { type: 'READ_ARTICLE_BEGIN', payload: '' };
    expect(readArticleReducer(initialArticleState, action)).toEqual(initialArticleState);
  });
  it('Should return success state', () => {
    const action = { type: 'READ_ARTICLE_SUCCESS', payload: '' };

    expect(readArticleReducer(initialArticleState, action)).toEqual(expectedSuccessState);
  });
  it('Should return failure state', () => {
    const action = { type: 'READ_ARTICLE_FAILURE', payload: '' };

    expect(readArticleReducer(initialArticleState, action)).toEqual(expectedFailureState);
  });
});
