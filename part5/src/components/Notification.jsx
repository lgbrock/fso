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
	if (successMessage) {
		return <div style={success}>{successMessage}</div>;
	}
	if (errorMessage) {
		return <div style={error}>{errorMessage}</div>;
	}
	return null;
};

export default Notification;
