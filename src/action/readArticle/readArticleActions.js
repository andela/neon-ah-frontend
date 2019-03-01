import makeRequest from '../../utils/axiosSetup';

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
    response: error,
    authorImage: null,
    userName: null
  }
});

export const readArticleSuccess = response => {
  return {
    type: READ_ARTICLE_SUCCESS,
    payload: {
      isLoading: false,
      article: response.data.payload,
      authorImage: response.data.payload.author.img,
      userName: response.data.payload.author.userName
    }
  };
};

export const readArticleAction = slug => async dispatch => {
  dispatch(readArticleBegin());
  try {
    const response = await makeRequest(`/articles/${slug}`);
    dispatch(readArticleSuccess(response));
  } catch (error) {
    dispatch(readArticleFailure(error));
  }
};
