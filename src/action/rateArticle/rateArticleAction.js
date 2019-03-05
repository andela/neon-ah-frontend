import decodeJwt from 'jwt-decode';
import makeRequest from '../../utils/axiosSetup';

export const RATE_ARTICLE_BEGIN = 'RATE_ARTICLE_BEGIN';
export const RATE_ARTICLE_SUCCESS = 'RATE_ARTICLE_SUCCESS';
export const RATE_ARTICLE_FAILURE = 'RATE_ARTICLE_FAILURE';
export const GET_ARTICLE_RATE_SUCCESS = 'GET_ARTICLE_RATE_SUCCESS';
export const GET_ARTICLE_RATE_END = 'GET_ARTICLE_RATE_END';

export const rateArticleBegin = () => ({
  type: RATE_ARTICLE_BEGIN,
  payload: {
    isLoading: true
  }
});

export const rateArticleFailure = error => ({
  type: RATE_ARTICLE_FAILURE,
  payload: {
    isLoading: false,
    response: error
  }
});

export const rateArticleSuccess = (response, rating) => ({
  type: RATE_ARTICLE_SUCCESS,
  payload: { isLoading: false, article: response.data.payload, response, rating }
});

export const rateArticleAction = (articleSlug, articleId, rating) => async dispatch => {
  const token = localStorage.getItem('userToken');
  const { userId } = decodeJwt(token);

  dispatch(rateArticleBegin());
  try {
    const response = await makeRequest(`/articles/${articleSlug}/rating`, {
      method: 'PUT',
      body: {
        rating,
        articleId,
        userId
      }
    });
    dispatch(rateArticleSuccess(response, rating));
  } catch (error) {
    dispatch(rateArticleFailure(error));
  }
};
