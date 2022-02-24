import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';

import { ALL_PERSONS } from './queries';

const Notify = ({ errorMessage }) => {
	if (errorMessage) {
		return <div style={{ color: 'red' }}>{errorMessage}</div>;
	}
	return null;
};

const App = () => {
	const result = useQuery(ALL_PERSONS);
	const [errorMessage, setErrorMessage] = useState(null);

	if (result.loading) {
		return <div>Loading...</div>;
	}

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	return (
		<>
			<h2>Phonebook</h2>
			<Notify errorMessage={errorMessage} />
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</>
	);
};

export default App;
