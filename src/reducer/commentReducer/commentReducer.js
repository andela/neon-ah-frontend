import { commentActionTypes } from '../../action/commentActions/commentAction';

const INITIAL_STATE = {
  isLoading: false,
  commentCreated: false,
  hasError: false,
  errorMessage: null
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commentActionTypes.CREATE_COMMENT:
      return {
        ...state,
        ...action.payload
      };
    case commentActionTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case commentActionTypes.CREATE_COMMENT_ERROR:
      return {
        ...state,
        ...action.payload
      };
    case commentActionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
