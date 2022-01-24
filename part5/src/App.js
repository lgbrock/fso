// Quick update
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newBlog, setNewBlog] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	// LOGIN
	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setMessage('Wrong credentials');
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<h2>Log in to application</h2>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	);

	// BLOG FORM
	const addBlog = (event) => {
		event.preventDefault();
		const blogObject = {
			title: newBlog,
			author: '',
			url: '',
		};
		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
			setNewBlog('');
		});
	};

	const blogForm = () => (
		<form onSubmit={addBlog}>
			<h2>Create new blog</h2>
			<div>
				title
				<input
					type='text'
					value={newBlog}
					name='Title'
					onChange={({ target }) => setNewBlog(target.value)}
				/>
				<br />
				author
				<input
					type='text'
					value={newBlog}
					name='Author'
					onChange={({ target }) => setNewBlog(target.value)}
				/>
				<br />
				url
				<input
					type='text'
					value={newBlog}
					name='Url'
					onChange={({ target }) => setNewBlog(target.value)}
				/>
			</div>
			<button type='submit'>create</button>
		</form>
	);

	return (
		<div>
			<h1>Blog app</h1>
			<Notification message={message} />
			{user === null ? loginForm() : <p>{user.name} logged in</p>}
			{user === null ? null : blogForm()}
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
