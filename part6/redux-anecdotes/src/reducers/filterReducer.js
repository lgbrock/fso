const defaultFilter = '';

const filterReducer = (state = defaultFilter, action) => {
	switch (action.type) {
		case 'SET_FILTER':
			return action.filter;
		default:
			return state;
	}
};

// Create a filter reducer that handles the SET_FILTER action.
export const createSetFilterAction = (filter) => {
	return {
		type: 'SET_FILTER',
		filter,
	};
};

export default filterReducer;
