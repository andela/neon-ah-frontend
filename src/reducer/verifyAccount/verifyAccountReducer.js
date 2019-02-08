const initialState = {
  statusCode: 0
};

const accountVerifyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_STATUS_CODE':
      return { ...state, statusCode: payload };
    default:
      return state;
  }
};

export default accountVerifyReducer;
