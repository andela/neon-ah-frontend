const initialState = {
  isEmailSent: false
};

const sendEmailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ON_EMAIL_SUBMIT':
      return { ...state, isEmailSent: !state.isEmailSent };
    default:
      return state;
  }
};

export default sendEmailReducer;
