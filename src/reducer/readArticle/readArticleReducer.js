import {
  READ_ARTICLE_BEGIN,
  READ_ARTICLE_FAILURE,
  READ_ARTICLE_SUCCESS
} from '../../action/readArticle/readArticleActions';

export const initialArticleState = {
  article: {},
  message: '',
  isLoading: false,
  response: {}
};

const readArticleReducer = (state = initialArticleState, { type, payload }) => {
  switch (type) {
    case READ_ARTICLE_BEGIN:
      return { ...state, ...payload };
    case READ_ARTICLE_SUCCESS:
      return { ...state, ...payload };
    case READ_ARTICLE_FAILURE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default readArticleReducer;
