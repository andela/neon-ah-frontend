const initialState = {
  statusCode: 0,
  articleTagOrAuthorDatas: {},
  bookmarks: [],
  isBookmark: false,
  following: []
};

const searchFunctionalityReducer = (state = initialState, { type, payload }) => {
  const { isBookmark } = state;
  switch (type) {
    case 'UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS':
      return { ...state, statusCode: payload.statusCode, articleTagOrAuthorDatas: payload.data };
    case 'UPDATE_ARTICLE_TAG_OR_AUTHOR_FAILURE':
      return { ...state, statusCode: payload };
    case 'GET_BOOKMARK_SUCCESS':
      return { ...state, bookmarks: payload };
    case 'GET_BOOKMARK_FAILURE':
      return { ...state, bookmarks: payload };
    case 'POST_BOOKMARK_SUCCESS':
      return { ...state, isBookmark: !isBookmark };
    case 'POST_BOOKMARK_FAILURE':
      return { ...state, isBookmark: !isBookmark };
    case 'GET_FOLLOWING_SUCCESS':
      return { ...state, following: payload };
    case 'GET_FOLLOWING_FAILURE':
      return { ...state, following: payload };
    default:
      return state;
  }
};

export default searchFunctionalityReducer;
