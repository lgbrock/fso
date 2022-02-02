import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdoteAction } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	// POST: /anecdotes/new
	const create = (event) => {
		event.preventDefault();
		dispatch(createNewAnecdoteAction(event.target.anecdote.value));
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={create}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
