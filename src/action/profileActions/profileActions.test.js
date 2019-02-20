import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '../../utils/axiosSetup';
import mockData from '../forgotPassword/mockData';
import * as profileActions from './profileActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(apiInstance);
const store = mockStore();

describe('profile Actions', () => {
  beforeEach(() => {
    jest.setTimeout(30000);
    store.clearActions();
  });

  test('FETCH USER PROFILE SUCCESS should equal the right value', () => {
    const actionType = profileActions.FETCH_USER_PROFILE_SUCCESS;
    expect(actionType).toEqual('FETCH_USER_PROFILE_SUCCESS');
  });

  test('FETCH USER PROFILE FAILURE should equal the right value', () => {
    const actionType = profileActions.FETCH_USER_PROFILE_FAILURE;
    expect(actionType).toEqual('FETCH_USER_PROFILE_FAILURE');
  });

  test('FETCH USER PROFILE BY ID SUCCESS should equal the right value', () => {
    const actionType = profileActions.FETCH_USER_PROFILE_BY_ID_SUCCESS;
    expect(actionType).toEqual('FETCH_USER_PROFILE_BY_ID_SUCCESS');
  });

  test('UPDATE USER PROFILE SUCCESS should equal the right value', () => {
    const actionType = profileActions.UPDATE_USER_PROFILE_SUCCESS;
    expect(actionType).toEqual('UPDATE_USER_PROFILE_SUCCESS');
  });

  test('UPDATE USER PROFILE FAILURE should equal the right value', () => {
    const actionType = profileActions.UPDATE_USER_PROFILE_FAILURE;
    expect(actionType).toEqual('UPDATE_USER_PROFILE_FAILURE');
  });

  it('Dispatches the correct action and payload for fetching user profile', done => {
    mock.onGet('/users/sam').reply(200, {
      status: 'success',
      data: {
        payload: {
          bio: 'NY Times Best Selling Author',
          email: 'samuel.adeniran@andela.com',
          fullName: 'Samuel Adeniran',
          getEmailsNotification: true,
          getInAppNotification: true,
          id: '6211521f-5baf-403e-9d66-04103240a5c2',
          img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
          articles: [],
          following: [],
          followers: [],
          userName: 'sam'
        },
        message: 'User retrieved successfully',
        statusCode: 200,
        error: null
      }
    });

    const match = {
      params: {
        username: 'sam'
      }
    };

    const expectedActions = [
      {
        payload: {
          data: {
            bio: 'NY Times Best Selling Author',
            email: 'samuel.adeniran@andela.com',
            fullName: 'Samuel Adeniran',
            getEmailsNotification: true,
            getInAppNotification: true,
            id: '6211521f-5baf-403e-9d66-04103240a5c2',
            img:
              'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
            userName: 'sam',
            articles: [],
            following: [],
            followers: []
          },
          isLoading: false,
          isSelf: true
        },
        type: 'FETCH_USER_PROFILE_SUCCESS'
      }
    ];

    const store = mockStore({
      data: {},
      isLoading: false,
      error: '',
      isSelf: true,
      message: ''
    });

    store.dispatch(profileActions.fetchUserProfile(match)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('Dispatches correct actions and payload when an error occurs when fetching user profile fails', () => {
    mock.onGet('/users/sam').reply(500, {
      status: 'failure',
      data: {
        payload: null,
        message: null,
        statusCode: 500,
        error: 'An error occured on the server'
      }
    });

    const match = {
      params: {
        username: 'sam'
      }
    };

    const expectedActions = [
      {
        payload: {
          error: 'An error occured on the server',
          isLoading: false
        },
        type: 'FETCH_USER_PROFILE_FAILURE'
      }
    ];

    store.dispatch(profileActions.fetchUserProfile(match)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('Dispatches the correct action and payload for fetching user profile by Id', done => {
    mock.onGet('/users').reply(200, {
      status: 'success',
      data: {
        payload: {
          bio: 'NY Times Best Selling Author',
          email: 'samuel.adeniran@andela.com',
          fullName: 'Samuel Adeniran',
          getEmailsNotification: true,
          getInAppNotification: true,
          id: '6211521f-5baf-403e-9d66-04103240a5c2',
          img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
          articles: [],
          following: [],
          followers: [],
          userName: 'sam'
        },
        message: 'User retrieved successfully',
        statusCode: 200,
        error: null
      }
    });

    const expectedActions = [
      {
        payload: {
          loggedInUserData: {
            bio: 'NY Times Best Selling Author',
            email: 'samuel.adeniran@andela.com',
            fullName: 'Samuel Adeniran',
            getEmailsNotification: true,
            getInAppNotification: true,
            id: '6211521f-5baf-403e-9d66-04103240a5c2',
            img:
              'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
            userName: 'sam',
            articles: [],
            following: [],
            followers: []
          }
        },
        type: 'FETCH_USER_PROFILE_BY_ID_SUCCESS'
      }
    ];

    const store = mockStore({
      data: {},
      loggedInUserData: {},
      isLoading: true,
      error: '',
      isSelf: true,
      message: '',
      visible: false
    });

    store.dispatch(profileActions.fetchUserProfileById()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('Dispatches correct actions and payload when user update profile successfully', () => {
    mock.onPut('/users').reply(200, {
      status: 'success',
      data: {
        payload: {
          bio: 'NY Times Best Selling Writer',
          email: 'samuel.adeniran@andela.com',
          fullName: 'Samuel Beef',
          getEmailsNotification: true,
          getInAppNotification: true,
          id: '6211521f-5baf-403e-9d66-04103240a5c2',
          img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
          updatedAt: '2019-02-26T23:03:15.144Z',
          userName: 'sam'
        },
        message: 'Profile updated successfully',
        statusCode: 200,
        error: null
      }
    });

    const expectedActions = [
      {
        payload: {
          data: {
            bio: 'NY Times Best Selling Writer',
            email: 'samuel.adeniran@andela.com',
            fullName: 'Samuel Beef',
            getEmailsNotification: true,
            getInAppNotification: true,
            id: '6211521f-5baf-403e-9d66-04103240a5c2',
            img:
              'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
            updatedAt: '2019-02-26T23:03:15.144Z',
            userName: 'sam'
          },
          message: 'Profile updated successfully',
          isSelf: false,
          visible: true
        },
        type: 'UPDATE_USER_PROFILE_SUCCESS'
      }
    ];

    store.dispatch(profileActions.postUserProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('Dispatches correct actions and payload when an error occurs when updating user profile fails', () => {
    mock.onPut('/users').reply(500, {
      status: 'failure',
      data: {
        payload: null,
        message: null,
        statusCode: 500,
        error: 'An error occured on the server'
      }
    });

    const expectedActions = [
      {
        payload: {
          error: 'An error occured on the server'
        },
        type: 'UPDATE_USER_PROFILE_FAILURE'
      }
    ];

    store.dispatch(profileActions.postUserProfile()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('Dispatches an action to clear the flash message', () => {
    const expectedAction = {
      type: 'CLEAR_FLASH_MESSAGE',
      payload: { visible: false, message: '' }
    };
    expect(profileActions.clearFlashMessage()).toEqual(expectedAction);
  });
});
