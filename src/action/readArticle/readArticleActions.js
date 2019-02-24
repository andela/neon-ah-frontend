import axios from 'axios';

export const READ_ARTICLE_BEGIN = 'READ_ARTICLE_BEGIN';
export const READ_ARTICLE_SUCCESS = 'READ_ARTICLE_SUCCESS';
export const READ_ARTICLE_FAILURE = 'READ_ARTICLE_FAILURE';

export const readArticleBegin = () => ({
  type: READ_ARTICLE_BEGIN,
  payload: {
    isLoading: true
  }
});

export const readArticleFailure = error => ({
  type: READ_ARTICLE_FAILURE,
  payload: {
    isLoading: false,
    response: error
  }
});

export const readArticleSuccess = response => ({
  type: READ_ARTICLE_SUCCESS,
  payload: { isLoading: false, article: response.data.payload }
});

export const readArticleAction = slug => async dispatch => {
  dispatch(readArticleBegin());
  try {
    const response = await axios.get(`https://neon-ah-staging.herokuapp.com/api/v1/articles/${slug}`);
    dispatch(readArticleSuccess(response.data));
  } catch (error) {
    dispatch(readArticleFailure(error));
  }
};
