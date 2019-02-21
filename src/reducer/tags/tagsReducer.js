const initialState = {
  tags: []
};

const tagsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_TAG_SUCCESS':
      return { ...state, tags: payload };
    default:
      return state;
  }
};

export default tagsReducer;
