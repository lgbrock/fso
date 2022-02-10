import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import { createNotificationAction } from './reducers/notificationReducer';

const App = () => {
	const dispatch = useDispatch();

	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

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
		dispatch(
			createNotificationAction(
				`a new blog ${createdBlog.title} by ${createdBlog.author} added`,
				'success'
			)
		);
	};

	const updateBlog = async (id, blogObject) => {
		const updatedBlog = await blogService.update(id, blogObject);
		setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
		dispatch(
			createNotificationAction(
				`blog ${updatedBlog.title} by ${updatedBlog.author} updated`,
				'success'
			)
		);

		blogFormRef.current.toggleVisibility();

		getBlogs();
	};

	const deleteBlog = async (id) => {
		const deletedBlog = await blogService.deleteBlog(id);
		setBlogs(blogs.filter((blog) => blog.id !== id));
		dispatch(
			createNotificationAction(
				`blog ${deletedBlog.title} by ${deletedBlog.author} deleted`,
				'success'
			)
		);

		blogFormRef.current.toggleVisibility();

		getBlogs();
	};

	return (
		<div>
			<h1>Blog app</h1>
			<Notification />
			{user === null ? (
				<LoginForm
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
					setUser={setUser}
				/>
			) : (
				<div>
					<p>
						{user.name} logged in
						<button onClick={handleLogout}>logout</button>
					</p>
					<BlogForm blogs={blogs} addBlog={addBlog} blogFormRef={blogFormRef} />
					<h2>Blogs</h2>
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							updateBlog={updateBlog}
							deleteBlog={deleteBlog}
							user={user}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
