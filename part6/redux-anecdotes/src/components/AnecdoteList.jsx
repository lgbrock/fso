import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVoteAction } from '../reducers/anecdoteReducer';
import {
	createShowNotificationAction,
	createClearNotificationAction,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
	const dispatch = useDispatch();

	// get anecdotes from store, filter them, and sort by number of votes
	const anecdotes = useSelector((state) =>
		state.anecdotes
			.filter((anecdote) =>
				anecdote.content.toLowerCase().includes(state.filter)
			)
			.sort((a, b) => b.votes - a.votes)
	);

	// POST /anecdotes/votes +1
	const vote = (anecdote) => {
		dispatch(createVoteAction(anecdote));
		dispatch(
			createShowNotificationAction(`Voted for anecdote "${anecdote.content}"`)
		);
		setTimeout(() => {
			dispatch(createClearNotificationAction());
		}, 5000);
	};

	// Order anecdotes by votes
	const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

	return (
		<div>
			{sortedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
