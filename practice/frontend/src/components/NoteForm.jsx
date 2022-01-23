import React from 'react';

const NoteForm = ({ addNote, newNote }) => {
	return (
		<div>
			<form onSubmit={addNote}>
				<input
					type='text'
					value={newNote}
					onChange={(e) => this.setState({ newNote: e.target.value })}
				/>
				<button type='submit'>save</button>
			</form>
		</div>
	);
};

export default NoteForm;
