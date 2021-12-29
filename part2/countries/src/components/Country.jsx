import React from 'react';

const Country = ({ country }) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<p>Capital {country.capital}</p>
			<p>Population {country.population}</p>
		</div>
	);
};

export default Country;
