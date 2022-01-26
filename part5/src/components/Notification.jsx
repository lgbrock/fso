import React from 'react';

const error = {
	color: 'red',
	background: 'lightgrey',
	font_size: 20,
	border_style: 'solid',
	border_radius: 5,
	padding: 10,
	margin_bottom: 10,
};

const success = {
	color: 'green',
	background: 'lightgrey',
	font_size: 20,
	border_style: 'solid',
	border_radius: 5,
	padding: 10,
	margin_bottom: 10,
};

const Notification = ({ successMessage, errorMessage }) => {
	if (successMessage === null && errorMessage === null) {
		return null;
	} else if (successMessage) {
		return (
			<div id='success' style={success}>
				{successMessage}
			</div>
		);
	} else {
		return (
			<div id='error' style={error}>
				{errorMessage}
			</div>
		);
	}
};

export default Notification;
