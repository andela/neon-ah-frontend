import rateArticleReducer, { initialArticleState } from './rateArticleReducer';

describe('RATE Article reducer', () => {
  const expectedSuccessState = {
    isLoading: false,
    message: '',
    response: {},
    rating: 0
  };
  const initialState = {
    isLoading: false,
    message: '',
    rating: 0,
    response: {}
  };
  const expectedFailureState = {
    message: '',
    isLoading: false,
    response: {},
    rating: 0
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
