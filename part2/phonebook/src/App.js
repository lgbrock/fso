import React, { useState } from 'react';
import Note from './components/Note';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('a new note...');
	// Shows all added notes
	const [showAll, setShowAll] = useState(true);

	const addNote = (event) => {
		event.preventDefault();
		console.log('button clicked', event.target);
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			// 50% chance of being important
			important: Math.random() < 0.5,
			// note id since it is never deleted in this app
			id: notes.length + 1,
		};

		setNotes(notes.concat(noteObject));
		// Resets the value of the controlled input element
		setNewNote('');
	};

	// Show only the important notes
	const notesToShow = notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type='submit'>save</button>
			</form>
		</div>
	);
};

export default App;
