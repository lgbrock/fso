import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdoteAction } from '../reducers/anecdoteReducer';
import { createNotificationAction } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	// POST: /anecdotes/new
	const newAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		dispatch(createNewAnecdoteAction(content));
		dispatch(
			createNotificationAction(
				`New anecdote: "${content}" has been created`,
				5000
			)
		);
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
