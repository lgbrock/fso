import React, { useState } from 'react';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import { useField } from './hooks';
import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Button,
	AppBar,
	Toolbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Menu = () => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Button color='inherit' component={Link} to='/'>
					Anecdotes
				</Button>
				<Button color='inherit' component={Link} to='/create'>
					Create new
				</Button>
				<Button color='inherit' component={Link} to='/about'>
					About
				</Button>
			</Toolbar>
		</AppBar>
	);
};

const Anecdote = ({ anecdotes }) => {
	const { id } = useParams();
	const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
	return (
		<div>
			<h2>
				'{anecdote.content}' by {anecdote.author}
			</h2>
			<p>
				has {anecdote.votes} votes
				<button onClick={() => anecdote.vote()}>vote</button>
			</p>
			<p>
				for more info see <a href={anecdote.info}>{anecdote.info}</a>
			</p>
		</div>
	);
};

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>

		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{anecdotes.map((anecdote) => (
						<TableRow key={anecdote.id}>
							<TableCell>
								<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
							</TableCell>
							<TableCell>{anecdote.author}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</div>
);

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an individual person or an
			incident. Occasionally humorous, anecdotes differ from jokes because their
			primary purpose is not simply to provoke laughter but to reveal a truth
			more general than the brief tale itself, such as to characterize a person
			by delineating a specific quirk or trait, to communicate an abstract idea
			about a person, place, or thing through the concrete details of a short
			narrative. An anecdote is "a story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes, at this app you can
			find the best and add more.
		</p>
	</div>
);

const Footer = () => {
	const padding = {
		paddingTop: 20,
	};

	return (
		<div style={padding}>
			Anecdote app for{' '}
			<a href='https://courses.helsinki.fi/fi/tkt21009'>
				Full Stack -websovelluskehitys
			</a>
			. See{' '}
			<a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>
				https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
			</a>{' '}
			for the source code.
		</div>
	);
};

const CreateNew = (props) => {
	const content = useField('text');
	const author = useField('text');
	const info = useField('url');
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.props.value,
			author: author.props.value,
			info: info.props.value,
			votes: 0,
		});

		props.showNotification(
			`A new anecdote '${content.props.value}' by ${author.props.value} added!`
		);
		history.push('/');
	};

	const resetFields = (event) => {
		event.preventDefault();
		content.resetField();
		author.resetField();
		info.resetField();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content.props} />
				</div>
				<div>
					author
					<input {...author.props} />
				</div>
				<div>
					url for more info
					<input {...info.props} />
				</div>
				<button type='submit'>create</button>
				<button type='button' onClick={resetFields}>
					reset
				</button>
			</form>
		</div>
	);
};

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: '1',
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: '2',
		},
	]);

	const [notification, setNotification] = useState('');

	const addNew = (anecdote) => {
		anecdote.id = (Math.random() * 10000).toFixed(0);
		setAnecdotes(anecdotes.concat(anecdote));
	};

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);
		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		};

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	const showNotification = (content) => {
		setNotification(content);
		setTimeout(() => {
			setNotification('');
		}, 10000);
	};

	return (
		<Container>
			<div>
				{notification && <Alert severity='success'>{notification}</Alert>}
			</div>
			<h1>Software anecdotes</h1>
			<Menu />
			<Switch>
				<Route path='/about'>
					<About />
				</Route>
				<Route path='/create'>
					<CreateNew addNew={addNew} showNotification={showNotification} />
				</Route>
				<Route path='/anecdotes/:id'>
					<Anecdote anecdotes={anecdotes} />
				</Route>
				<Route path='/'>
					<AnecdoteList anecdotes={anecdotes} />
				</Route>
			</Switch>
			<Footer />
		</Container>
	);
};

export default App;
