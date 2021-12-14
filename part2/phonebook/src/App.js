import React, { useState } from 'react';

const App = () => {
	// use the person's name as value of the key property
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	// controls the form input element
	const [newName, setNewName] = useState(['']);
	// set the new phone number
	const [newNumber, setNewNumber] = useState(['']);
	// filter the phonebook
	const [filter, setFilter] = useState('');

	const addName = (event) => {
		event.preventDefault();
		console.log('button clicked', event.target);
		const nameObject = {
			name: newName,
			number: newNumber,
			filter: filter,
			id: persons.length + 1,
		};
		// check if name already exists
		const nameExists = persons.some((person) => person.name === newName);
		if (nameExists) {
			alert(`${newName} is already added to the phonebook!`);
		} else {
			setPersons(persons.concat(nameObject));
			setNewName('');
			setNewNumber('');
			setFilter('');
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
		console.log('name changed', event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
		console.log('number changed', event.target.value);
	};

	// show filtered names
	const handleFilter = (event) => {
		setFilter(event.target.value);
		const filteredNames = persons.filter((person) =>
			person.name.toLowerCase().includes(filter.toLowerCase())
		);
		setPersons(filteredNames);
	};

	return (
		<div>
			<div>debug: {}</div>
			<h2>Phonebook</h2>
			<div>
				Filter shown with:
				<input value={filter} onChange={handleFilter} />
			</div>
			<h2>Add a new name and number</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map((person) => (
					<p key={person.id}>
						{person.name}
						<br />
						{person.number}
					</p>
				))}
			</div>
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
