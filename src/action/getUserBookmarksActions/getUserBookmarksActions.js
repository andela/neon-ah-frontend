import makeRequest from '../../utils/axiosSetup';

export const GET_ALL_BOOKMARKS = 'GET_ALL_BOOKMARKS';
export const GET_ALL_BOOKMARKS_BEGIN = 'GET_ALL_BOOKMARKS_BEGIN';
export const GET_ALL_BOOKMARKS_FAILURE = 'GET_ALL_BOOKMARKS_FAILURE';

export const getBookmarksBegin = () => ({
  type: GET_ALL_BOOKMARKS_BEGIN,
  payload: {
    isLoading: true
  }
});

export const getBookmarks = response => ({
  type: GET_ALL_BOOKMARKS,
  payload: {
    bookmarks: response.payload.bookmarks,
    response: response.message,
    isLoading: false
  }
});

export const getBookmarksFailure = error => ({
  type: GET_ALL_BOOKMARKS_FAILURE,
  payload: {
    response: error,
    isLoading: false
  }
});

export const getUserBookmarkActions = () => async dispatch => {
  try {
    dispatch(getBookmarksBegin());
    const response = await makeRequest('/user/bookmarks');
    dispatch(getBookmarks(response.data));
  } catch (error) {
    dispatch(getBookmarksFailure(error));
  }
};
