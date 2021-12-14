import { useState } from 'react';

const Filter = () => {
	// Persons
	const [persons, setPersons] = useState([]);
	// filter the phonebook
	const [filter, setFilter] = useState('');

	const handleFilter = (event) => {
		setFilter(event.target.value);
		const filteredNames = persons.filter((person) =>
			person.name.toLowerCase().includes(filter.toLowerCase())
		);
		setPersons(filteredNames);
	};

	return (
		<div>
			Filter shown with:
			<input value={filter} onChange={handleFilter} />
		</div>
	);
};

export default Filter;
