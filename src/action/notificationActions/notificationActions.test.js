import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { NotificationAction, notificationActionTypes } from './notificationActions';
import { apiInstance } from '../../utils/axiosSetup';

const mock = new MockAdapter(apiInstance);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Notification async actions', () => {
  it('dispatches FETCH_NOTIFICATIONS_ERROR when fetching of notification fails', done => {
    mock.onGet('/https://neon-ah-staging.herokuapp.com/api/v1/notifications?unread').networkError();

    const expectedActions = [
      {
        type: notificationActionTypes.FETCH_NOTIFICATIONS,
        payload: {
          isLoading: true,
          notificationList: [],
          hasError: false,
          errorMessage: null
        }
      },
      {
        type: notificationActionTypes.FETCH_NOTIFICATIONS_ERROR,
        payload: {
          isLoading: false,
          hasError: true,
          notificationList: [],
          errorMessage: "An error occured Couldn't fetch notification"
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(NotificationAction.fetchNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('dispatches UPDATE_NOTIFICATION when notification update is successful', done => {
    mock.onPut('/notifications/10a3e55b-30b2-4d0f-8f04-2d0838e6f44f').reply(200, {
      status: 'success',
      data: {
        statusCode: 200,
        message: 'Notification was updated successfully',
        payload: {
          notifications: [{}]
        }
      }
    });
    mock.onGet('/notifications').reply(200, {
      status: 'success',
      data: {
        statusCode: 200,
        message: 'All User notifications',
        payload: {
          notifications: [{}]
        }
      }
    });

    const expectedActions = [
      {
        type: notificationActionTypes.UPDATE_NOTIFICATION,
        payload: {
          notificationList: [{}]
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(NotificationAction.updateNotification('10a3e55b-30b2-4d0f-8f04-2d0838e6f44f'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
    });
  });

  it('dispatches FETCH_NOTIFICATIONS_ERROR when updating of notification fails', done => {
    mock.onPut('/notifications/10a3e55b-30b2-4d0f-8f04-2d0838e6f44f').networkError();

    const expectedActions = [
      {
        type: notificationActionTypes.FETCH_NOTIFICATIONS_ERROR,
        payload: {
          isLoading: false,
          hasError: true,
          notificationList: [],
          errorMessage: "An error occured Couldn't fetch notification"
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(NotificationAction.updateNotification('10a3e55b-30b2-4d0f-8f04-2d0838e6f44f'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
    });
  });

  it('dispatches FETCH_NOTIFICATIONS_SUCCESS when fetching of notification succeed', done => {
    mock.onGet('/notifications').reply(200, {
      status: 'success',
      data: {
        statusCode: 200,
        message: 'You have no notifications yet'
      }
    });

    const expectedActions = [
      {
        type: notificationActionTypes.FETCH_NOTIFICATIONS,
        payload: {
          isLoading: true,
          notificationList: [],
          hasError: false,
          errorMessage: null
        }
      },
      {
        type: notificationActionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        payload: {
          isLoading: false,
          notificationList: []
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(NotificationAction.fetchNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('dispatches FETCH_NOTIFICATIONS_SUCCESS when notificationList is not empty', done => {
    mock.onGet('/notifications').reply(200, {
      status: 'success',
      data: {
        statusCode: 200,
        message: 'All User notifications',
        payload: {
          notifications: [{}]
        }
      }
    });

    const expectedActions = [
      {
        type: notificationActionTypes.FETCH_NOTIFICATIONS,
        payload: {
          isLoading: true,
          notificationList: [],
          hasError: false,
          errorMessage: null
        }
      },
      {
        type: notificationActionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        payload: {
          isLoading: false,
          notificationList: [{}]
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(NotificationAction.fetchNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
