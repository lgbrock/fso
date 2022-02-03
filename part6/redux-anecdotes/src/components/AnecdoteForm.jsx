import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdoteAction } from '../reducers/anecdoteReducer';
import {
	createShowNotificationAction,
	createClearNotificationAction,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	// POST: /anecdotes/new
	const newAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		dispatch(createNewAnecdoteAction(content));
		dispatch(createShowNotificationAction(`Created new anecdote "${content}"`));
		setTimeout(() => {
			dispatch(createClearNotificationAction());
		}, 5000);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={newAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
