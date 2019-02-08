const placeholderReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
      case 'TEST_REDUX':
        return { ...state, payload: action.payload};
      default:
        return state;
    }
}

export default placeholderReducer;
