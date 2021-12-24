import React from 'react';

const Notifications = ({ successMessage, errorMessage }) => {
	return (
		<div className='notifications'>
			{successMessage && <div className='success'>{successMessage}</div>}
			{errorMessage && <div className='error'>{errorMessage}</div>}
		</div>
	);
};

export default Notifications;
