import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';
import CountrySearch from './components/CountrySearch';
import CountryList from './components/CountryList';

const App = () => {
	const [filter, setFilter] = useState('');
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	const displayCountries =
		filter &&
		countries.filter((country) =>
			country.name.toLowerCase().includes(filter.toLowerCase())
		);

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const showInfo = (countryName) => {
		setFilter(countryName);
	};

	return (
		<>
			<label>
				Find countries:
				<input type='search' value={filter} onChange={handleFilterChange} />
			</label>

			{displayCountries.length === 1 ? (
				<Country country={displayCountries[0]} />
			) : (
				<CountryList countries={displayCountries ? displayCountries : []} />
			)}
		</>
	);
};

export default App;
