export default () => dispatch => {
  return dispatch({
    type: 'TEST_REDUX',
    payload: 'Set up redux'
  });
};
