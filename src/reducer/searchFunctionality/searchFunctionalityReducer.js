const initialState = {
  statusCode: 0,
  articleTagOrAuthorDatas: {},
  bookmarks: [],
  isBookmark: false,
  following: [],
  slug: '',
  username: '',
  searchInputValue: '',
  followers: [],
  value: []
};

const searchFunctionalityReducer = (state = initialState, { type, payload }) => {
  const { isBookmark } = state;
  switch (type) {
    case 'UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS':
      return { ...state, statusCode: payload.statusCode, articleTagOrAuthorDatas: payload.data };
    case 'UPDATE_ARTICLE_TAG_OR_AUTHOR_FAILURE':
      return { ...state, statusCode: payload };
    case 'GET_BOOKMARK_SUCCESS':
      return { ...state, bookmarks: payload.value, slug: payload.slug };
    case 'GET_BOOKMARK_FAILURE':
      return { ...state, bookmarks: payload };
    case 'POST_BOOKMARK_SUCCESS':
      return { ...state, isBookmark: !isBookmark };
    case 'POST_BOOKMARK_FAILURE':
      return { ...state, isBookmark: !isBookmark };
    case 'GET_FOLLOWING_BEGIN':
      return { ...state, following: payload.value, username: payload.username };
    case 'GET_FOLLOWING_SUCCESS':
      return { ...state, ...payload };
    case 'GET_FOLLOWING_FAILURE':
      return { ...state, following: payload };
    case 'SEND_ARTICLE_SLUG':
      return { ...state, slug: payload };
    case 'SEND_AUTHOR_NAME':
      return { ...state, username: payload };
    case 'GET_SEARCH_INPUT_VALUE':
      return { ...state, searchInputValue: payload };
    case 'GET_FOLLOWERS_BEGIN':
      return { ...state, ...payload };
    case 'GET_FOLLOWERS_SUCCESS':
      return { ...state, ...payload };
    case 'GET_FOLLOWERS_FAILURE':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default searchFunctionalityReducer;
