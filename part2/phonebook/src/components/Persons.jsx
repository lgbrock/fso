import React from 'react';

const Persons = (props) => {
	return (
		<div key={props.newName}>
			{props.persons.map((person) => (
				<p key={person.id}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default Persons;
