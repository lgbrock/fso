import React from 'react';

const Persons = ({ persons, toggleDelete }) => {
	const label = persons.map((person) => {
		return (
			<p key={person.name}>
				{person.name} {person.number}
				<button onClick={() => toggleDelete(person.id)}>delete</button>
			</p>
		);
	});
	return <ul>{label}</ul>;
};

export default Persons;
