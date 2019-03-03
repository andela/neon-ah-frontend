import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer/rootReducer';

const allStoreEnhancers = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, allStoreEnhancers);

export default store;
