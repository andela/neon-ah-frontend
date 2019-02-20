import profileReducer from './profileReducer';
import * as profileAction from '../../action/profileActions/profileActions';

const initialState = {
  data: {},
  loggedInUserData: {},
  isLoading: true,
  error: '',
  isSelf: true,
  message: '',
  visible: false
};

describe('Profile reducer tests', () => {
  test('returns initial state', () => {
    const action = { type: 'dummyaction' };
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });

  test('handles fetch user profile success', () => {
    const payload = {
      data: {
        bio: 'NY Times Best Selling Author',
        email: 'samuel.adeniran@andela.com',
        fullName: 'Samuel Adeniran',
        getEmailsNotification: true,
        getInAppNotification: true,
        id: '6211521f-5baf-403e-9d66-04103240a5c2',
        img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
        userName: 'sam',
        articles: [],
        following: [],
        followers: []
      },
      isLoading: false,
      isSelf: true
    };
    const action = { type: profileAction.FETCH_USER_PROFILE_SUCCESS, payload };

    expect(profileReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload
    });
  });

  test('handles fetch user profile by id success', () => {
    const payload = {
      loggedInUserData: {}
    };
    const action = { type: profileAction.FETCH_USER_PROFILE_SUCCESS_HEADER, payload };

    expect(profileReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload
    });
  });

  test('handles fetch user profile failure', () => {
    const payload = {
      error: 'An error occured on the server',
      isLoading: false
    };
    const action = { type: profileAction.FETCH_USER_PROFILE_FAILURE, payload };

    expect(profileReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload
    });
  });

  test('handles update user profile success', () => {
    const payload = {
      data: {
        bio: 'NY Times Best Selling Author',
        email: 'samuel.adeniran@andela.com',
        fullName: 'Samuel Adeniran',
        getEmailsNotification: true,
        getInAppNotification: true,
        id: '6211521f-5baf-403e-9d66-04103240a5c2',
        img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
        userName: 'sam'
      },
      message: 'Profile updated successfully',
      isSelf: true,
      visible: true
    };
    const action = { type: profileAction.UPDATE_USER_PROFILE_SUCCESS, payload };

    expect(profileReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload
    });
  });

  test('handles update user profile failure', () => {
    const payload = {
      error: 'An error occured on the server'
    };
    const action = { type: profileAction.UPDATE_USER_PROFILE_FAILURE, payload };

    expect(profileReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload
    });
  });

  test('handles removal of flash message', () => {
    const payload = {
      message: '',
      visible: ''
    };
    const action = { type: profileAction.CLEAR_FLASH_MESSAGE, payload };

    expect(profileReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload
    });
  });
});
