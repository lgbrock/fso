import anecdoteReducer from './anecdoteReducer';
import deepFreeze from 'deep-freeze';

describe('anecdoteReducer', () => {
	test('returns a new state when action type is NEW_ANECDOTE', () => {
		const state = [];
		const action = {
			type: 'NEW_ANECDOTE',
			data: {
				content: 'test',
				id: 1,
				votes: 0,
			},
		};
		deepFreeze(state);
		deepFreeze(action);
		const newState = anecdoteReducer(state, action);
		expect(newState).toEqual([
			{
				content: 'test',
				id: 1,
				votes: 0,
			},
		]);
	});

	test('returns a new state when action type is INIT_ANECDOTES', () => {
		const state = [];
		const action = {
			type: 'INIT_ANECDOTES',
			data: [
				{
					content: 'test',
					id: 1,
					votes: 0,
				},
			],
		};
		deepFreeze(state);
		deepFreeze(action);
		const newState = anecdoteReducer(state, action);
		expect(newState).toEqual([
			{
				content: 'test',
				id: 1,
				votes: 0,
			},
		]);
	});

	test('returns a new state when action type is VOTE', () => {
		const state = [
			{
				content: 'test',
				id: 1,
				votes: 0,
			},
		];
		const action = {
			type: 'VOTE',
			data: {
				id: 1,
				votes: 1,
			},
		};
		deepFreeze(state);
		deepFreeze(action);
		const newState = anecdoteReducer(state, action);
		expect(newState).toEqual([
			{
				content: 'test',
				id: 1,
				votes: 1,
			},
		]);
	});
});
