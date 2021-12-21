// *-- PHONEBOOK  REDO--*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	// add new name event handler
	const addName = (event) => {
		event.preventDefault();
		if (newName === '' && newNumber === '') {
			return;
		}
		const newPerson = {
			name: newName,
			number: newNumber,
		};
		// if name already exists, display error message
		if (persons.find((person) => person.name === newPerson.name)) {
			alert(`${newPerson.name} is already added to phonebook`);
			return;
		}
		setPersons(persons.concat(newPerson));
		setNewName('');
		setNewNumber('');
	};

	// filter names event handler
	const handleFilterChange = (event) => {
		setFilter(event.target.value);
		const filteredNames = persons.filter((person) =>
			person.name.includes(event.target.value)
		);
		setPersons(filteredNames);
	};

	// Get persons from server
	useEffect(() => {
		console.log('effect');
		axios.get('http://localhost:3001/persons').then((response) => {
			console.log('response', response);
			setPersons(response.data);
		});
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h3>Add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				addName={addName}
				setNewName={setNewName}
				setNewNumber={setNewNumber}
			/>
			<h3>Numbers</h3>
			<Persons key={newName.id} persons={persons} filter={filter} />
		</div>
	);
};

export default App;

// *-- PHONEBOOK --*
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Filter from './components/Filter';
// import PersonForm from './components/PersonForm';
// import Persons from './components/Persons';

// const App = () => {
// 	const [persons, setPersons] = useState([]);
// 	useEffect(() => {
// 		console.log('App.js is running');
// 		axios.get('http://localhost:3001/persons').then((response) => {
// 			console.log('response', response);
// 			setPersons(response.data);
// 		});
// 	}, []);
// 	console.log('persons', persons);

// 	return (
// 		<div>
// 			<h2>Phonebook</h2>
// 			<Filter />
// 			<h2>add a new</h2>
// 			<PersonForm />
// 			<h2>Numbers</h2>
// 			<Persons />
// 		</div>
// 	);
// };

// export default App;

// * -- PRACTICE -- *

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Note from './components/Note';

// const App = () => {
// 	const [notes, setNotes] = useState([]);
// 	const [newNote, setNewNote] = useState('a new note...');
// 	// Shows all added notes
// 	const [showAll, setShowAll] = useState(true);

// 	useEffect(() => {
// 		console.log('effect');
// 		axios.get('http://localhost:3001/notes').then((response) => {
// 			console.log('promise fulfilled');
// 			setNotes(response.data);
// 		});
// 	}, []);

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
// 				{notesToShow.map((note) => (
// 					<Note key={note.id} note={note} />
// 				))}
// 			</ul>
// 			<div>
// 				<button onClick={() => setShowAll(!showAll)}>
// 					show {showAll ? 'important' : 'all'}
// 				</button>
// 			</div>

// 			<form onSubmit={addNote}>
// 				<input value={newNote} onChange={handleNoteChange} />
// 				<button type='submit'>save</button>
// 			</form>
// 		</div>
// 	);
// };

// export default App;
