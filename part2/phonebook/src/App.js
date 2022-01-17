// *-- PHONEBOOK --*
import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notifications';
import phonebookService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	// get all names in phonebook db and display on window load
	useEffect(() => {
		phonebookService
			.getAll()
			.then((initialPersons) => setPersons(initialPersons))
			.catch((error) => alert(error));
	}, []);

	// filter names event handler
	const handleFilterChange = (event) => {
		setFilter(event.target.value);
		const filteredNames = persons.filter((person) =>
			person.name.toLowerCase().includes(event.target.value.toLowerCase())
		);
		setPersons(filteredNames);
	};

	// add new name event handler
	const addName = (event) => {
		event.preventDefault();
		const newPerson = {
			name: newName,
			number: newNumber,
		};

		// check if name already exists
		const existingPerson = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);

		// add new name to database
		if (!existingPerson) {
			phonebookService
				.create(newPerson)
				.then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson));
					setSuccessMessage(`Added ${newName}`);
					setTimeout(() => {
						setSuccessMessage(null);
					}, 3000);
					setNewName('');
					setNewNumber('');
				})
				.catch((error) => {
					setErrorMessage(error.response.data.error);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				});
		} else {
			// update existing name in database
			if (
				window.confirm(
					`${newPerson.name} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				phonebookService
					.update(existingPerson.id, newPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== returnedPerson.id ? person : returnedPerson
							)
						);
						setSuccessMessage(`Updated ${newName}`);
						setTimeout(() => {
							setSuccessMessage(null);
						}, 5000);
						setNewName('');
						setNewNumber('');
					})
					// alert that name has already been Deleted
					.catch((err) => {
						if (err.response.data) {
							setErrorMessage(err.response.data.error);
							setTimeout(() => {
								setErrorMessage(null);
							}, 5000);
						} else {
							setErrorMessage(
								`Information of ${newPerson.name} has already been removed from server`
							);
							setPersons(
								persons.filter((person) => person.id !== existingPerson.id)
							);
							setNewName('');
							setNewNumber('');
							setTimeout(() => {
								setErrorMessage(null);
							}, 5000);
						}
					});
			}
		}
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
			<Notification
				successMessage={successMessage}
				errorMessage={errorMessage}
			/>
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
