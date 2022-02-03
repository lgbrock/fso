const defaultMessage = null;

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

// Action creator function for clearing the current notification after 5 seconds
export const createClearNotificationAction = () => {
	return {
		type: 'CLEAR_NOTIFICATION',
	};
};

// Action creator function for displaying notification message
export const createNotificationAction = (message, timeout = 5000) => {
	return async (dispatch) => {
		dispatch(createShowNotificationAction(message));
		setTimeout(() => {
			dispatch(createClearNotificationAction());
		}, timeout);
	};
};

export default notificationReducer;
