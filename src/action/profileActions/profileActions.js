import makeRequest from '../../utils/axiosSetup';
import manageUserToken from '../../utils/auth/authentication';
import isTokenValid from '../../utils/auth/jwtDecode';

const token = manageUserToken.getUserToken();

export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

export const FETCH_USER_PROFILE_BY_ID_SUCCESS = 'FETCH_USER_PROFILE_BY_ID_SUCCESS';

export const START_USER_UPDATE_PROFILE = 'START_USER_UPDATE_PROFILE';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';

export const CLEAR_FLASH_MESSAGE = 'CLEAR_FLASH_MESSAGE';

export const fetchUserProfileError = data => {
  return { type: FETCH_USER_PROFILE_FAILURE, payload: { error: data.data.message, isLoading: false } };
};

export const startUserUpdate = () => {
  return {
    type: 'START_USER_UPDATE_PROFILE',
    payload: { loadingBtn: true }
  };
};

export const fetchUserProfileById = () => {
  return async dispatch => {
    try {
      const response = await makeRequest(`/users`, { method: 'GET' });
      dispatch({
        type: FETCH_USER_PROFILE_BY_ID_SUCCESS,
        payload: { loggedInUserData: response.data.payload }
      });
    } catch (error) {
      const {
        response: { data }
      } = error;
    }
  };
};

export const fetchUserProfile = match => {
  return async dispatch => {
    try {
      const response = await makeRequest(`users/${match.params.username}`);

      let isSelf = true;

      if (token) {
        dispatch(fetchUserProfileById());
        const decoded = isTokenValid(token);
        if (decoded.userId !== response.data.payload.id) {
          isSelf = false;
        }
      }

      if (isSelf) {
        dispatch({
          type: FETCH_USER_PROFILE_SUCCESS,
          payload: { loggedInUserData: response.data.payload, isSelf, isLoading: false, data: {} }
        });
        return;
      }

      dispatch({
        type: FETCH_USER_PROFILE_SUCCESS,
        payload: { data: response.data.payload, isSelf, isLoading: false }
      });
    } catch (error) {
      const {
        response: { data }
      } = error;
      dispatch(fetchUserProfileError(data));
    }
  };
};

export const updateUserProfile = (userUpdateData, history) => {
  return async dispatch => {
    try {
      dispatch(startUserUpdate());
      const response = await makeRequest('/users', {
        method: 'PUT',
        body: userUpdateData
      });

      let isSelf = true;

      if (token) {
        const decoded = isTokenValid(token);
        if (decoded.userId !== response.data.payload.id) {
          isSelf = false;
        }
      }

      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: {
          message: response.data.message,
          loggedInUserData: response.data.payload,
          isSelf,
          visible: true,
          loadingBtn: false
        }
      });

      history.push(`/profile/${response.data.payload.userName}`);
    } catch (error) {
      const {
        response: { data }
      } = error;
      dispatch({
        type: UPDATE_USER_PROFILE_FAILURE,
        payload: { message: data.data.message, visible: true, loadingBtn: false }
      });
    }
  };
};

export const clearFlashMessage = () => ({
  type: 'CLEAR_FLASH_MESSAGE',
  payload: { visible: false, message: '' }
});
