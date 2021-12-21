import React from 'react';

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addName}>
			<div>
				name:{' '}
				<input
					value={props.newName}
					onChange={(event) => props.setNewName(event.target.value)}
				/>
			</div>
			<div>
				number:{' '}
				<input
					value={props.newNumber}
					onChange={(event) => props.setNewNumber(event.target.value)}
				/>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
