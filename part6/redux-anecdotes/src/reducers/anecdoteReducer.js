const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

// Generate random ID
const getId = () => (100000 * Math.random()).toFixed(0);

// Turn an anecdote string into an object with ID and votes
const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

// Holds the initial app state (anecdote fixtures mapped to objects)
const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
	// Upvote an anecdote
	switch (action.type) {
		case 'VOTE':
			const id = action.data.id;
			const anecdote = state.find((a) => a.id === id);
			const updatedAnecdote = {
				...anecdote,
				votes: anecdote.votes + 1,
			};
			return state.map((a) => (a.id === id ? updatedAnecdote : a));
		// Create new anecdote
		case 'CREATE':
			return [...state, asObject(action.data.content)];
		default:
			return state;
	}
};

// Action creator function for upvoting an anecdote
export const createVoteAction = (id) => ({
	type: 'VOTE',
	data: {
		id,
	},
});

// Action creator function for creating a new anecdote
export const createNewAnecdoteAction = (content) => ({
	type: 'CREATE',
	data: {
		content,
	},
});

export default reducer;
