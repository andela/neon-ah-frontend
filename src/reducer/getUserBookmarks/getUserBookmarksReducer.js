import {
  GET_ALL_BOOKMARKS,
  GET_ALL_BOOKMARKS_BEGIN,
  GET_ALL_BOOKMARKS_FAILURE
} from '../../action/getUserBookmarksActions/getUserBookmarksActions';

export const initialBookmarkState = {
  bookmarks: [],
  response: {},
  isLoading: false
};

const getUserBookmarksReducer = (state = initialBookmarkState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BOOKMARKS_BEGIN:
      return { ...state, ...payload };
    case GET_ALL_BOOKMARKS:
      return { ...state, ...payload };
    case GET_ALL_BOOKMARKS_FAILURE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default getUserBookmarksReducer;
