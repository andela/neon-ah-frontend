import makeRequest from '../../utils/axiosSetup';

export const GET_TAG_SUCCESS = 'GET_TAG_SUCCESS';
export const GET_TAG_FAILURE = 'GET_TAG_FAILURE';

export const getTags = () => {
  return async dispatch => {
    try {
      const res = await makeRequest(`/tags`, {
        method: 'GET'
      });

      dispatch({ type: GET_TAG_SUCCESS, payload: res.data.payload.tags });
    } catch (error) {
      dispatch({ type: GET_TAG_FAILURE, payload: [] });
    }
  };
};
