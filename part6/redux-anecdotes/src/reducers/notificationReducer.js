const defaultMessage = 'Notification Message';

const notificationReducer = (state = defaultMessage, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.notification;
		case 'CLEAR_NOTIFICATION':
			return '';
		default:
			return state;
	}
};

// Action creator function for displaying a new notification
export const createShowNotificationAction = (notification) => {
	return {
		type: 'SET_NOTIFICATION',
		notification,
	};
};

export default notificationReducer;
