import React from 'react';

const CountrySearch = ({ filter, onFilterChange }) => {
	return (
		<div>
			Find countries
			<input value={filter} onChange={onFilterChange} type='search' />
		</div>
	);
};

export default CountrySearch;
