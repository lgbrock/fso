import React from 'react';

const Filter = (props) => {
	return (
		<div>
			filter shown with:{' '}
			<input
				value={props.filter}
				onChange={(event) => props.handleFilterChange(event)}
			/>
		</div>
	);
};

export default Filter;
