import makeRequest from '../../utils/axiosSetup';

export const GET_READ_STATS_SUCCESS = 'GET_READ_STATS_SUCCESS';
export const GET_READ_STATS_FAILURE = 'GET_READ_STATS_FAILURE';

export const getReadStats = () => {
  return async dispatch => {
    try {
      const res = await makeRequest(`/stats`, {
        method: 'GET'
      });

      dispatch({ type: GET_READ_STATS_SUCCESS, payload: res.data.payload.readStats });
    } catch (error) {
      dispatch({ type: GET_READ_STATS_FAILURE, payload: [] });
    }
  };
};
