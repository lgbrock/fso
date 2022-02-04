import React from 'react';
import { connect } from 'react-redux';
import { createNewAnecdoteAction } from '../reducers/anecdoteReducer';
import { createNotificationAction } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
	// POST: /anecdotes/new
	const newAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		props.createNewAnecdoteAction(content);
		props.createNotificationAction(`You created new Anecdote: '${content}'`, 5);
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

const mapDispatchToProps = {
	createNewAnecdoteAction,
	createNotificationAction,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
