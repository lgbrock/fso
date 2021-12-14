import React, { useState } from 'react';

const App = () => {
	// use the person's name as value of the key property
	const [persons, setPersons] = useState([]);
	// controls the form input element
	const [newName, setNewName] = useState('input name...');
	// name already exists in the phonebook
	const [newNameExists, setNewNameExists] = useState(false);

	const addName = (event) => {
		event.preventDefault();
		console.log('button clicked', event.target);
		const nameObject = {
			content: newName,
			id: persons.length + 1,
		};
		// check if name already exists
		const nameExists = persons.some((person) => person.content === newName);
		if (nameExists) {
			alert(`${newName} is already added to the phonebook!`);
		} else {
			setPersons(persons.concat(nameObject));
			setNewName('');
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
		console.log('input changed', event.target.value);
	};

	return (
		<div>
			<div>debug: {newNameExists}</div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>

			<ul>
				{persons.map((person) => (
					<li key={person.id}>{person.content}</li>
				))}
			</ul>
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
// 			content: newNote,
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
