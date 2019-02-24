import rateArticleReducer, { initialArticleState } from './rateArticleReducer';

describe('RATE Article reducer', () => {
  const expectedSuccessState = {
    isLoading: false,
    message: '',
    response: {},
    rating: {}
  };
  const initialState = {
    isLoading: false,
    message: '',
    rating: {},
    response: {}
  };
  const expectedFailureState = {
    message: '',
    isLoading: false,
    response: {},
    rating: {}
  };
  it('Should return initial state', () => {
    const action = { type: 'RATE_ARTICLE_BEGIN', payload: '' };
    expect(rateArticleReducer(initialState, action)).toEqual(initialState);
  });
  it('Should return success state', () => {
    const action = { type: 'RATE_ARTICLE_SUCCESS', payload: '' };

    expect(rateArticleReducer(initialArticleState, action)).toEqual(initialState);
  });
  it('Should return failure state', () => {
    const action = { type: 'RATE_ARTICLE_FAILURE', payload: '' };

    expect(rateArticleReducer(initialArticleState, action)).toEqual(expectedFailureState);
  });
});
