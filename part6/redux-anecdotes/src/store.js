import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer, { createInitAction } from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import anecdoteService from './services/anecdotes';

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

anecdoteService.getAll().then((anecdotes) => {
	store.dispatch(createInitAction(anecdotes));
});

export default store;
