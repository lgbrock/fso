import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// My Imports
import notificationReducer from './reducers/notificationReducer';

// Create Redux Store
const reducer = combineReducers({
	notification: notificationReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
