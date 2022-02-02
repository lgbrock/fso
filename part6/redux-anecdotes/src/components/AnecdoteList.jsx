import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVoteAction } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	// POST /anecdotes/votes +1
	const vote = (id) => {
		dispatch(createVoteAction(id));
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
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
