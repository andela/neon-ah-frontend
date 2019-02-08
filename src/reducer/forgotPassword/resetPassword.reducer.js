const initialState = {
  message: {}
};
const sendPasswordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ERROR_OR_SUCCESS':
      return { ...state, message: { ...payload } };
    default:
      return state;
  }
};

export default sendPasswordReducer;
