import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	return (
		<div>
			<h2>Phonebook</h2>
			<Filter />
			<h2>Add a new name and number</h2>
			<PersonForm />
			<h3>Numbers</h3>
			<Persons />
		</div>
	);
};

export default App;

// * -- PRACTICE -- *

// import React, { useState } from 'react';
// import Note from './components/Note';

// const App = () => {
// 	const [notes, setNotes] = useState([]);
// 	const [newNote, setNewNote] = useState('a new note...');
// 	// Shows all added notes
// 	const [showAll, setShowAll] = useState(true);

// 	const addNote = (event) => {
// 		event.preventDefault();
// 		console.log('button clicked', event.target);
// 		const noteObject = {
// 			name: newNote,
// 			date: new Date().toISOString(),
// 			// 50% chance of being important
// 			important: Math.random() < 0.5,
// 			// note id since it is never deleted in this app
// 			id: notes.length + 1,
// 		};

// 		setNotes(notes.concat(noteObject));
// 		// Resets the value of the controlled input element
// 		setNewNote('');
// 	};

// 	const handleNoteChange = (event) => {
// 		setNewNote(event.target.value);
// 		console.log('input changed', event.target.value);
// 	};

// 	// Show only the important notes
// 	const notesToShow = notes.filter((note) => note.important);

// 	return (
// 		<div>
// 			<h1>Notes</h1>
// 			<ul>
// 				{notes.map((note) => (
// 					<Note key={note.id} note={note} />
// 				))}
// 			</ul>
// 			<div>
// 				<button onClick={() => setShowAll(!showAll)}>
// 					show {showAll ? 'important' : 'all'}
// 				</button>
// 			</div>
// 			<ul>
// 				{notesToShow.map((note) => (
// 					<Note key={note.id} note={note} />
// 				))}
// 			</ul>
// 			<form onSubmit={addNote}>
// 				<input value={newNote} onChange={handleNoteChange} />
// 				<button type='submit'>save</button>
// 			</form>
// 		</div>
// 	);
// };

// export default App;
