import keyMirror from 'keymirror';
import makeRequest from '../../utils/axiosSetup';
import { readArticleSuccess } from '../readArticle/readArticleActions';

export const commentActionTypes = keyMirror({
  CREATE_COMMENT: null,
  CREATE_COMMENT_SUCCESS: null,
  CREATE_COMMENT_ERROR: null,
  CLEAR_MESSAGE: null
});

export const CommentAction = {
  createComment: (commentData, articleSlug) => async dispatch => {
    dispatch({
      type: commentActionTypes.CREATE_COMMENT,
      payload: {
        isLoading: true,
        hasError: false,
        commentCreated: false,
        errorMessage: null
      }
    });
    try {
      await makeRequest(`/articles/${articleSlug}/comments`, { method: 'POST', body: commentData });
      const response = await makeRequest(`/articles/${articleSlug}`, { method: 'GET' });
      /* istanbul ignore next */
      dispatch({
        type: commentActionTypes.CREATE_COMMENT_SUCCESS,
        payload: {
          isLoading: false,
          hasError: false,
          commentCreated: true,
          errorMessage: null
        }
      });
      dispatch(readArticleSuccess(response));
      /* istanbul ignore next */
      setTimeout(() => {
        dispatch({
          type: commentActionTypes.CLEAR_MESSAGE,
          payload: {
            isLoading: false,
            hasError: false,
            commentCreated: false,
            errorMessage: null
          }
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: commentActionTypes.CREATE_COMMENT_ERROR,
        payload: {
          isLoading: false,
          hasError: true,
          errorMessage: "An error occured Couldn't create the comment"
        }
      });
      setTimeout(() => {
        dispatch({
          type: commentActionTypes.CLEAR_MESSAGE,
          payload: {
            isLoading: false,
            hasError: false,
            commentCreated: false,
            errorMessage: null
          }
        });
      }, 1300);
    }
  }
};
