import { notificationActionTypes } from '../../action/notificationActions/notificationActions';

const INITIAL_STATE = {
  isLoading: false,
  notificationList: [],
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
    case notificationActionTypes.FETCH_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload
      };
    case notificationActionTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case notificationActionTypes.FETCH_NOTIFICATIONS_ERROR:
      return {
        ...state,
        ...action.payload
      };
    case notificationActionTypes.UPDATE_NOTIFICATION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
