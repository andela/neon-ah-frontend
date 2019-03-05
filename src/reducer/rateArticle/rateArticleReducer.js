import {
  RATE_ARTICLE_BEGIN,
  RATE_ARTICLE_FAILURE,
  RATE_ARTICLE_SUCCESS,
  GET_ARTICLE_RATE_SUCCESS,
  GET_ARTICLE_RATE_END
} from '../../action/rateArticle/rateArticleAction';

const initialArticleState = {
  rating: 0,
  message: '',
  isLoading: false,
  response: {}
};

const rateArticleReducer = (state = initialArticleState, { type, payload }) => {
  switch (type) {
    case RATE_ARTICLE_BEGIN:
      return { ...state, ...payload };
    case RATE_ARTICLE_SUCCESS:
      return { ...state, ...payload };
    case GET_ARTICLE_RATE_SUCCESS:
      return { ...state, ...payload };
    case GET_ARTICLE_RATE_END:
      return { ...state, ...payload };
    case RATE_ARTICLE_FAILURE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default rateArticleReducer;
