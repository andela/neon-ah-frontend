import makeRequest from '../../utils/axiosSetup';

export const CREATING_ARTICLE = 'CREATING_ARTICLE';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

export const creatingArticle = status => ({ type: CREATING_ARTICLE, payload: status });
export const createArticleFailure = error => ({ type: CREATE_ARTICLE_FAILURE, payload: error });

export const createArticle = (articleData, history) => async dispatch => {
  try {
    const articlePayload = {
      isPublished: true,
      title: articleData.articleTitle,
      content: articleData.articleBody,
      banner: articleData.bannerUrl,
      tagsList: articleData.tags.map(tag => tag.text).toString()
    };

    dispatch(creatingArticle(true));

    const {
      data: { payload }
    } = await makeRequest('/articles', { method: 'POST', body: articlePayload });

    dispatch({ type: CREATE_ARTICLE_SUCCESS, payload });

    return history.push(`/article/read/${payload.slug}`);
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return dispatch(createArticleFailure(Object.values(error.response.data.data.error)));
      default:
        return dispatch(createArticleFailure(Object.values(error.response.data.data.error)));
    }
  }
};
