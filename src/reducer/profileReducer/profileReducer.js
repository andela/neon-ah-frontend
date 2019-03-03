const initialState = {
  data: {},
  loggedInUserData: {},
  isLoading: true,
  error: '',
  isSelf: true,
  message: '',
  visible: false,
  loadingBtn: false
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER_PROFILE_SUCCESS':
      return {
        ...state,
        ...payload
      };
    case 'FETCH_USER_PROFILE_FAILURE':
      return { ...state, ...payload };

    case 'START_USER_UPDATE_PROFILE':
      return {
        ...state,
        ...payload
      };

    case 'UPDATE_USER_PROFILE_SUCCESS':
      return {
        ...state,
        ...payload
      };
    case 'UPDATE_USER_PROFILE_FAILURE':
      return { ...state, ...payload };
    case 'FETCH_USER_PROFILE_BY_ID_SUCCESS':
      return { ...state, ...payload };
    case 'CLEAR_FLASH_MESSAGE':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default profileReducer;
