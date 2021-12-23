// *-- PHONEBOOK --*
import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	// get all names in phonebook db
	useEffect(() => {
		phonebookService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	// add new name event handler
	const addName = (event) => {
		event.preventDefault();
		const newPerson = {
			name: newName,
			number: newNumber,
		};
		if (newName === '' && newNumber === '') {
			return;
		}
		// if name already exists, display error message
		if (persons.find((person) => person.name === newPerson.name)) {
			alert(`${newPerson.name} is already added to phonebook`);
			return;
		}
		// if name does not exist, add new name to phonebook
		phonebookService.create(newPerson).then((returnedPerson) => {
			setPersons(persons.concat(returnedPerson));
			setNewName('');
			setNewNumber('');
		});
	};

	// filter names event handler
	const handleFilterChange = (event) => {
		setFilter(event.target.value);
		const filteredNames = persons.filter((person) =>
			person.name.includes(event.target.value)
		);
		setPersons(filteredNames);
	};

	// toggle delete of event handler
	const toggleDelete = (id) => {
		const person = persons.find((person) => person.id === id);
		if (!window.confirm(`Delete ${person.name}?`)) {
			return;
		}
		phonebookService.remove(id).then(() => {
			setPersons(persons.filter((person) => person.id !== id));
		});
	};

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
			<Persons persons={persons} toggleDelete={toggleDelete} filter={filter} />
		</div>
	);
};

export default App;

// * -- PRACTICE -- *

// import React, { useState, useEffect } from 'react';
// import Note from './components/Note';
// import noteService from './services/notes';
// import './app.css';

// const App = () => {
// 	const [notes, setNotes] = useState([]);
// 	const [newNote, setNewNote] = useState('');
// 	// Shows all added notes
// 	const [showAll, setShowAll] = useState(false);

// 	useEffect(() => {
// 		noteService.getAll().then((initialNotes) => {
// 			setNotes(initialNotes);
// 		});
// 	}, []);

// 	const addNote = (event) => {
// 		event.preventDefault();
// 		const noteObject = {
// 			content: newNote,
// 			date: new Date().toISOString(),
// 			// 50% chance of being important
// 			important: Math.random() < 0.5,
// 		};
// 		noteService.create(noteObject).then((returnedNote) => {
// 			setNotes(notes.concat(returnedNote));
// 			setNewNote('');
// 		});
// 	};

// 	const toggleImportanceOf = (id) => {
// 		const note = notes.find((n) => n.id === id);
// 		const changedNote = { ...note, important: !note.important };

// 		noteService
// 			.update(id, changedNote)
// 			.then((returnedNote) => {
// 				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
// 			})
// 			.catch((error) => {
// 				alert(`the note '${note.content}' was already deleted from server`);
// 				setNotes(notes.filter((n) => n.id !== id));
// 			});
// 	};

// 	const handleNoteChange = (event) => {
// 		console.log(event.target.value);
// 		setNewNote(event.target.value);
// 	};

// 	// Show only the important notes
// 	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

// 	return (
// 		<div>
// 			<h1>Notes</h1>
// 			<div>
// 				<button onClick={() => setShowAll(!showAll)}>
// 					show {showAll ? 'important' : 'all'}
// 				</button>
// 			</div>
// 			<ul>
// 				{notesToShow.map((note, i) => (
// 					<Note
// 						key={i}
// 						note={note}
// 						toggleImportance={() => toggleImportanceOf(note.id)}
// 					/>
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
