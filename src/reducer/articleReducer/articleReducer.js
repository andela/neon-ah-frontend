import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  CREATING_ARTICLE
} from '../../action/articleActions/articleActions';

const initialState = {
  isCreating: false,
  articleErrors: [],
  createdArticle: {}
};

const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_ARTICLE_SUCCESS:
      return { ...state, createdArticle: payload, articleErrors: [], isCreating: false };
    case CREATE_ARTICLE_FAILURE:
      return { ...state, articleErrors: [...payload], isCreating: false };
    case CREATING_ARTICLE:
      return { ...state, isCreating: payload };
    default:
      return state;
  }
};

export default articleReducer;
