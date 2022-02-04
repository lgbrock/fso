// Notification Fixture Data
const defaultNotificationObject = {
	notification: null,
	timeoutID: null,
};

const notificationReducer = (state = defaultNotificationObject, action) => {
	switch (action.type) {
		// Set the timeout ID so it can be cleared later.
		case 'SET_TIMEOUT_ID':
			return {
				notification: state.notification,
				timeoutID: action.data,
			};

		// Display a new notification
		case 'SHOW_NOTIFICATION':
			if (state.timeoutID) {
				clearTimeout(state.timeoutID);
			}
			return {
				notification: action.data,
				timeoutID: null,
			};

		// Hide an existing notification
		case 'CLEAR_NOTIFICATION':
			return {
				notification: null,
				timeoutID: null,
			};
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
		const timeoutID = setTimeout(() => {
			dispatch(createClearNotificationAction());
		}, timeout);
		dispatch(createSetTimeoutAction(timeoutID));
	};
};

export const createSetTimeoutAction = (timeoutID) => ({
	type: 'SET_TIMEOUT_ID',
	data: timeoutID,
});

export default notificationReducer;
