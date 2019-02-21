import makeRequest from '../../utils/axiosSetup';

export const GET_HOMEPAGE_ARTICLE_SUCCESS = 'GET_HOMEPAGE_ARTICLE_SUCCESS';
export const GET_HOMEPAGE_ARTICLE_FAILURE = 'GET_HOMEPAGE_ARTICLE_FAILURE';

export const getHomePageArticles = () => {
  return async dispatch => {
    try {
      const res = await makeRequest(`/articles`, {
        method: 'GET'
      });
      dispatch({ type: GET_HOMEPAGE_ARTICLE_SUCCESS, payload: res.data.payload.articles });
    } catch (error) {
      dispatch({ type: GET_HOMEPAGE_ARTICLE_FAILURE, payload: [] });
    }
  };
};
