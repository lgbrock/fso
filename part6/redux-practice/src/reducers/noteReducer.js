const initialState = [
	{
		content: 'reducer defines how redux store works',
		important: true,
		id: 1,
	},
	{
		content: 'state of store can contain any data',
		important: false,
		id: 2,
	},
];

const noteReducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_NOTE':
			return [...state, action.data];
		case 'INIT_NOTES':
			return action.data;
		case 'TOGGLE_IMPORTANCE':
			const id = action.data.id;
			const noteToChange = state.find((n) => n.id === id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important,
			};
			return state.map((note) => (note.id !== id ? note : changedNote));
		default:
			return state;
	}
};

export const createNote = (data) => {
	return {
		type: 'NEW_NOTE',
		data,
	};
};

export const initializeNotes = (notes) => {
	return {
		type: 'INIT_NOTES',
		data: notes,
	};
};

export const toggleImportanceOf = (id) => {
	return {
		type: 'TOGGLE_IMPORTANCE',
		data: { id },
	};
};

export default noteReducer;
