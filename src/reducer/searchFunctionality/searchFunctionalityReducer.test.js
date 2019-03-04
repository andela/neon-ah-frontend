import searchFunctionalityReducer from './searchFunctionalityReducer';

describe('Search functionality Reducer', () => {
  test('Initial state', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: false,
      slug: '',
      following: [],
      username: '',
      searchInputValue: '',
      following: [],
      followers: [],
      value: []
    };

    expect(searchFunctionalityReducer(undefined, action)).toEqual(initialState);
  });

  test('should update the state when getting article, tag or author is successful', () => {
    const action = { type: 'UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS', payload: { statusCode: 200, data: {} } };
    const expectedState = {
      statusCode: 200,
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

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
  test('should update the state when getting article, tag or author is successful', () => {
    const action = { type: 'UPDATE_ARTICLE_TAG_OR_AUTHOR_SUCCESS', payload: { statusCode: 200, data: {} } };
    const expectedState = {
      statusCode: 200,
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

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
  test('should update the state when getting article, tag or author is not successful', () => {
    const action = { type: 'UPDATE_ARTICLE_TAG_OR_AUTHOR_FAILURE', payload: 200 };
    const expectedState = {
      statusCode: 200,
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

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
  test('should update the state when getting bookmark is successful', () => {
    const action = { type: 'GET_BOOKMARK_SUCCESS', payload: { value: [], slug: '' } };
    const expectedState = {
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

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
  test('should update the state when getting bookmark is not successful', () => {
    const action = { type: 'GET_BOOKMARK_FAILURE', payload: [] };
    const expectedState = {
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

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
  test('should update the state when creating bookmark is successful', () => {
    const action = { type: 'POST_BOOKMARK_SUCCESS' };
    const expectedState = {
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: true,
      following: [],
      slug: '',
      username: '',
      searchInputValue: '',
      followers: [],
      value: []
    };

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
  test('should update the state when creating bookmark is not successful', () => {
    const action = { type: 'POST_BOOKMARK_FAILURE' };
    const expectedState = {
      statusCode: 0,
      articleTagOrAuthorDatas: {},
      bookmarks: [],
      isBookmark: true,
      following: [],
      slug: '',
      username: '',
      searchInputValue: '',
      followers: [],
      value: []
    };

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
  test('should update the state when getting following is successful', () => {
    const action = { type: 'GET_FOLLOWING_SUCCESS', payload: { value: [], username: '' } };
    const expectedState = {
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

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
  test('should update the state when getting following is not successful', () => {
    const action = { type: 'GET_FOLLOWING_FAILURE', payload: [] };
    const expectedState = {
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

    expect(searchFunctionalityReducer(undefined, action)).toEqual(expectedState);
  });
});
