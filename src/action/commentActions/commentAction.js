import keyMirror from 'keymirror';
import makeRequest from '../../utils/axiosSetup';

export const commentActionTypes = keyMirror({
  CREATE_COMMENT: null,
  CREATE_COMMENT_SUCCESS: null,
  CREATE_COMMENT_ERROR: null,
  CLEAR_MESSAGE: null,
  FETCH_COMMENTS: null,
  FETCH_COMMENTS_ERROR: null
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
        /* istanbul ignore next */
        // eslint-disable-next-line no-restricted-globals
        location.reload();
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
  },
  fetchComments: articleSlug => async dispatch => {
    try {
      const res = await makeRequest(`/articles/${articleSlug}/comments`, { method: 'GET' });
      /* istanbul ignore next */
      dispatch({
        type: commentActionTypes.FETCH_COMMENTS,
        payload: {
          comments: res.data.payload
        }
      });
    } catch (error) {
      dispatch({
        type: commentActionTypes.FETCH_COMMENTS_ERROR,
        payload: {
          errorMessage: "An error occured Couldn't fetch the comment"
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
