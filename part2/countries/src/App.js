import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
	const [searchName, setSearchName] = useState('');
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
		});
	}, []);
	console.log(countries);

	return (
		<div>
			find countries <input />
		</div>
	);
};

export default App;
