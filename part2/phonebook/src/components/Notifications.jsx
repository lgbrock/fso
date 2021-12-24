import React from 'react';

const Notifications = ({ message }) => {
	if (message === null) {
		return null;
	}
	return <div className='error'>{message}</div>;
};

export default Notifications;
