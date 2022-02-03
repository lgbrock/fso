import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer, {
	initializeAnecdotesAction,
} from './reducers/anecdoteReducer';
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
	store.dispatch(initializeAnecdotesAction(anecdotes));
});

export default store;
