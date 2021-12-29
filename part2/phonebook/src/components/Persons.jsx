import React from 'react';

const Persons = ({ persons, toggleDelete }) => {
	const label = persons.map((person) => {
		return (
			<p className='persons' key={person.name}>
				{person.name} {person.number}
				<button className='btn' onClick={() => toggleDelete(person.id)}>
					delete
				</button>
			</p>
		);
	});
	return <p>{label}</p>;
};

export default Persons;
