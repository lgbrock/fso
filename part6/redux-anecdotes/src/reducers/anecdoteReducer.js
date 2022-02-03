import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
	// Upvote an anecdote
	switch (action.type) {
		// Initialize anecdote list from fixed data
		case 'INIT':
			return action.data;
		// Upvote an anecdote
		case 'VOTE':
			const id = action.data.id;
			const anecdote = state.find((a) => a.id === id);
			const updatedAnecdote = {
				...anecdote,
				votes: anecdote.votes + 1,
			};
			return state.map((a) => (a.id === id ? updatedAnecdote : a));
		// Create new anecdote
		case 'NEW':
			return [...state, action.data];
		default:
			return state;
	}
};

// Action creator function for initializing anecdote list
export const createInitAction = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({
			type: 'INIT',
			data: anecdotes,
		});
	};
};

// Action creator function for upvoting an anecdote
export const createVoteAction = (id) => ({
	type: 'VOTE',
	data: {
		id,
	},
});

// Action creator function for creating a new anecdote
export const createNewAnecdoteAction = (anecdote) => ({
	type: 'NEW',
	data: anecdote,
});

export default anecdoteReducer;
