const initialState = {
  articles: []
};

const homePageArticlesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_HOMEPAGE_ARTICLE_SUCCESS':
      return { ...state, articles: payload };
    default:
      return state;
  }
};

export default homePageArticlesReducer;
