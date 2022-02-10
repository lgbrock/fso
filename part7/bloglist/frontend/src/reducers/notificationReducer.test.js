import notificationReducer from './notificationReducer';
import deepFreeze from 'deep-freeze';

describe('notificationReducer', () => {
	it('should return the initial state', () => {
		expect(notificationReducer(undefined, {})).toEqual({});
	});

	it('should handle SET_NOTIFICATION', () => {
		const initialState = {};
		const action = {
			type: 'SET_NOTIFICATION',
			notification: {
				message: 'test',
				type: 'success',
			},
		};
		deepFreeze(initialState);
		deepFreeze(action);
		expect(notificationReducer(initialState, action)).toEqual(
			action.notification
		);
	});
});
