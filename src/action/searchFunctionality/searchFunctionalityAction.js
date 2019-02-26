import makeRequest from '../../utils/axiosSetup';
import isTokenValid from '../../utils/auth/jwtDecode';
import getToken from '../../utils/auth/authentication';

// // action type
export const UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS = 'UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS';
export const UPDATE_ARTICLE_TAG_OR_AUTHOR_FAILURE = 'UPDATE_ARTICLE_TAG_OR_AUTHOR_FAILURE';
export const GET_BOOKMARK_SUCCESS = 'GET_BOOKMARK_SUCCESS';
export const GET_BOOKMARK_FAILURE = 'GET_BOOKMARK_FAILURE';
export const POST_BOOKMARK_FAILURE = 'POST_BOOKMARK_FAILURE';
export const POST_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS';
export const GET_FOLLOWING_FAILURE = 'GET_FOLLOWING_FAILURE';
export const GET_FOLLOWING_SUCCESS = 'GET_FOLLOWING_SUCCESS';

export const sendBookmarkSlug = slug => {
  return { type: 'SEND_ARTICLE_SLUG', payload: slug };
};

export const sendUserName = userName => {
  return { type: 'SEND_AUTHOR_NAME', payload: userName };
};

// action creator
export const updateWithArticleTagOrAuthor = (statusCode, data) => {
  return { type: UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS, payload: { statusCode, data } };
};

export const getfollowingAuthorApiCall = username => {
  return async dispatch => {
    try {
      const response = await makeRequest(`/users/${username}/following`, {
        method: 'GET'
      });
      if (response.data.message === `${username} currently has no following`) {
        dispatch({ type: GET_FOLLOWING_SUCCESS, payload: { value: [], username: '' } });
      } else {
        dispatch({ type: GET_FOLLOWING_SUCCESS, payload: { value: response.data.payload.following, username: '' } });
      }
    } catch (error) {
      const {
        response: { data }
      } = error;
      dispatch({ type: GET_FOLLOWING_FAILURE, payload: data.data.payload.following });
    }
  };
};

export const followAnAuthorApiCall = username => {
  const token = getToken.getUserToken();
  const decoded = isTokenValid(token);
  return async dispatch => {
    try {
      await makeRequest(`/users/${username}/follow`, {
        method: 'POST'
      });
      dispatch(getfollowingAuthorApiCall(decoded.userName));
    } catch (error) {
      await makeRequest(`/users/${username}/unfollow`, {
        method: 'DELETE'
      });
      await dispatch(getfollowingAuthorApiCall(decoded.userName));
    }
  };
};

export const getUserBookmarkApiCall = () => {
  return async dispatch => {
    try {
      const response = await makeRequest(`/user/bookmarks`, {
        method: 'GET'
      });
      if (response.data.message === 'You have not bookmarked any article yet') {
        dispatch({ type: GET_BOOKMARK_SUCCESS, payload: { value: [], slug: '' } });
      } else {
        dispatch({ type: GET_BOOKMARK_SUCCESS, payload: { value: response.data.payload.bookmarks, slug: '' } });
      }
    } catch (error) {
      dispatch({ type: GET_BOOKMARK_FAILURE, payload: [] });
    }
  };
};

export const bookmarkArticleApiCall = slug => {
  return async dispatch => {
    try {
      await makeRequest(`/articles/${slug}/bookmark`, {
        method: 'POST'
      });
      dispatch(getUserBookmarkApiCall());
    } catch (error) {
      dispatch(getUserBookmarkApiCall());
    }
  };
};

export const searchByOptionApiCall = (option, parameter) => {
  return async dispatch => {
    try {
      const token = getToken.getUserToken();
      const response = await makeRequest(`/search?keyword=${parameter}`, {
        method: 'GET'
      });
      const { statusCode, payload } = response.data;
      if (payload.articles) {
        await dispatch(getUserBookmarkApiCall());
      }
      if (payload.authors && token) {
        const decoded = isTokenValid(token);
        await dispatch(getfollowingAuthorApiCall(decoded.userName));
      }
      dispatch({ type: UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS, payload: { statusCode, data: payload } });
    } catch (error) {
      const {
        response: { data }
      } = error;
      dispatch({ type: UPDATE_ARTICLE_TAG_OR_AUTHOR_FAILURE, payload: data.data.statusCode });
    }
  };
};
