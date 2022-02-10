// Notification data
const defaultNotificationObject = {
	message: null,
	type: null,
	timeoutID: null,
};

const notificationReducer = (state = defaultNotificationObject, action) => {
	switch (action.type) {
		// Set the timeout ID so it can be cleared later.
		case 'SET_TIMEOUT_ID':
			return {
				message: state.message,
				type: state.type,
				timeoutID: action.data,
			};

		// Display a new notification
		case 'SHOW_NOTIFICATION':
			if (state.timeoutID) {
				clearTimeout(state.timeoutID);
			}
			return {
				type: action.data.type,
				message: action.data.message,
				timeoutID: null,
			};

		// Hide an existing notification
		case 'HIDE_NOTIFICATION':
			return {
				type: null,
				notification: null,
				timeoutID: null,
			};

		// Do nothing otherwise
		default:
			return state;
	}
};

// Action create for notification to auto-hide and have custom timeout
export const createNotificationAction = (message, type, timeout = 5000) => {
	return async (dispatch) => {
		const timeoutID = setTimeout(() => {
			dispatch(hideNotificationAction());
		}, timeout);
		dispatch(setTimeoutIDAction(timeoutID));
		dispatch(showNotificationAction(message, type));
	};
};

// Action creator for displaying a new notification
export const showNotificationAction = (message, type) => {
	return {
		type: 'SHOW_NOTIFICATION',
		data: {
			message,
			type,
		},
	};
};

/// Action creator for hiding a notification
export const hideNotificationAction = () => {
	return {
		type: 'HIDE_NOTIFICATION',
	};
};

// Action creator for setting the timeout ID
export const setTimeoutIDAction = (timeoutID) => {
	return {
		type: 'SET_TIMEOUT_ID',
		data: timeoutID,
	};
};

export default notificationReducer;
