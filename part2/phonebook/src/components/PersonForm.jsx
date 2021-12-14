import { useState } from 'react';

const PersonForm = () => {
	// use the person's name as value of the key property
	const [persons, setPersons] = useState([]);
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

	return (
		<div>
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
		</div>
	);
};

export default PersonForm;
