import React from 'react';
import { connect } from 'react-redux';
import { createSetFilterAction } from '../reducers/filterReducer';

const Filter = (props) => {
	const handleChange = (event) => {
		props.createSetFilterAction(event.target.value);
	};

	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			Filter: <input onChange={handleChange} />
		</div>
	);
};

// Action Creators
const mapDispatchToProps = {
	createSetFilterAction,
};

export default connect(null, mapDispatchToProps)(Filter);
