import React from 'react';
import { connect } from 'react-redux';
import { createVoteAction } from '../reducers/anecdoteReducer';
import { createNotificationAction } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
	// POST /anecdotes/votes +1
	const vote = (anecdote) => {
		props.createVoteAction(anecdote);
		props.createNotificationAction(`You voted: '${anecdote.content}'`, 5);
	};

	return (
		<div>
			{props.anecdotes.map((anecdote) => (
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

// Get anecdotes from state, filter them, and sort them by number of votes
const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes
			.filter((anecdote) => anecdote.content.includes(state.filter))
			.sort((a, b) => b.votes - a.votes),
	};
};

// Action Creators
const mapDispatchToProps = {
	createNotificationAction,
	createVoteAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
