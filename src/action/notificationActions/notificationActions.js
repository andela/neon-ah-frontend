import keyMirror from 'keymirror';
import makeRequest from '../../utils/axiosSetup';

export const notificationActionTypes = keyMirror({
  FETCH_NOTIFICATIONS: null,
  FETCH_NOTIFICATIONS_SUCCESS: null,
  FETCH_NOTIFICATIONS_ERROR: null,
  UPDATE_NOTIFICATION: null
});

export const NotificationAction = {
  fetchNotifications: () => async dispatch => {
    dispatch({
      type: notificationActionTypes.FETCH_NOTIFICATIONS,
      payload: {
        isLoading: true,
        notificationList: [],
        hasError: false,
        errorMessage: null
      }
    });
    try {
      const res = await makeRequest('/notifications', { method: 'GET' });
      const notificationList =
        res.data.message === 'You have no notifications yet' ? [] : res.data.payload.notifications;
      dispatch({
        type: notificationActionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        payload: {
          isLoading: false,
          notificationList: notificationList.reverse()
        }
      });
    } catch (error) {
      dispatch({
        type: notificationActionTypes.FETCH_NOTIFICATIONS_ERROR,
        payload: {
          isLoading: false,
          hasError: true,
          notificationList: [],
          errorMessage: "An error occured Couldn't fetch notification"
        }
      });
    }
  },
  updateNotification: notificationId => async dispatch => {
    try {
      await makeRequest(`/notifications/${notificationId}`, { method: 'PUT' });
      const res = await makeRequest('/notifications', { method: 'GET' });
      const notificationList = res.data.payload.notifications;
      dispatch({
        type: notificationActionTypes.UPDATE_NOTIFICATION,
        payload: {
          notificationList: notificationList.reverse()
        }
      });
    } catch (error) {
      dispatch({
        type: notificationActionTypes.FETCH_NOTIFICATIONS_ERROR,
        payload: {
          isLoading: false,
          hasError: true,
          notificationList: [],
          errorMessage: "An error occured Couldn't fetch notification"
        }
      });
    }
  }
};
