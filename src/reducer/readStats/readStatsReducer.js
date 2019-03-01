const initialState = {
  readStats: []
};

const readStatsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_READ_STATS_SUCCESS':
      return { ...state, readStats: payload };
    default:
      return state;
  }
};

export default readStatsReducer;
