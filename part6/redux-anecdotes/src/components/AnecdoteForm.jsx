import React from 'react';
import anecdoteService from '../services/anecdotes';
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
		event.target.anecdote.value = '';
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(createNewAnecdoteAction(newAnecdote));
		dispatch(
			createShowNotificationAction(
				`Anecdote '${newAnecdote.content}' added!`,
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
