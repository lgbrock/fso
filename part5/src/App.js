// Quick update
import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	// const [newBlog, setNewBlog] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const [user, setUser] = useState(null);

	const blogFormRef = useRef();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);

			getBlogs();
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
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
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

	const handleLogout = (event) => {
		event.preventDefault();
		window.localStorage.removeItem('loggedBlogappUser');
		setUser(null);
	};

	// BLOG FORM

	const getBlogs = async () => {
		const blogs = await blogService.getAll();
		blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
		setBlogs(blogs);
	};

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility();
		const createdBlog = await blogService.create(blogObject);
		setBlogs(blogs.concat(createdBlog));
		setErrorMessage(null);
		setTimeout(() => {
			setSuccessMessage(
				`a new blog ${createdBlog.title} by ${createdBlog.author} added`
			);
			setBlogs(blogs.concat(createdBlog));
			setErrorMessage(null);
			setTimeout(() => {
				setSuccessMessage(null);
			});
		});
	};

	const updateBlog = async (id, blogObject) => {
		const updatedBlog = await blogService.update(id, blogObject);
		setSuccessMessage(`blog ${updatedBlog.title} updated`);
		setTimeout(() => {
			setSuccessMessage(null);
		}, 5000);
	};

	const deleteBlog = async (id) => {
		const deletedBlog = await blogService.deleteBlog(id);
		setSuccessMessage(`blog ${deletedBlog.title} deleted`);
		setTimeout(() => {
			setSuccessMessage(null);
		}, 5000);
	};

	const blogForm = () => (
		<Togglable buttonLabel='create new blog' ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	);

	return (
		<div>
			<h1>Blog app</h1>
			<Notification message={successMessage} type='success' />
			<Notification message={errorMessage} type='error' />
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged in
						<button onClick={handleLogout}>logout</button>
					</p>
					{blogForm()}

					<h2>Blogs</h2>
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							updateBlog={updateBlog}
							deleteBlog={deleteBlog}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
