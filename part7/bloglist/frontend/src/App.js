import React, { useState, useEffect } from 'react';
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
	const [user, setUser] = useState(null);

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

	// const updateBlog = async (id, blogObject) => {
	// 	const updatedBlog = await blogService.update(id, blogObject);
	// 	setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
	// 	dispatch(
	// 		createNotificationAction(
	// 			`blog ${updatedBlog.title} by ${updatedBlog.author} updated`,
	// 			'success'
	// 		)
	// 	);

	// 	blogFormRef.current.toggleVisibility();

	// 	getBlogs();
	// };

	const onDelete = async (blog) => {
		if (
			window.confirm(
				`Are you sure you want to remove the blog "${blog.title}"?`
			)
		) {
			try {
				const response = await blogService.deleteBlog(blog.id);
				if ({}.hasOwnProperty.call(response, 'error')) {
					dispatch(createNotificationAction('error', response.error));
				} else {
					setBlogs(blogs.filter((b) => b.id !== blog.id));
				}
			} catch (error) {
				dispatch(createNotificationAction('error', error.message));
			}
		}
	};

	return (
		<>
			<Notification />
			{!user && <LoginForm blogService={blogService} setUser={setUser} />}
			{user && (
				<div>
					<h1>Blog App</h1>
					<p>
						Welcome, {user.name}!<button onClick={handleLogout}>Logout</button>
					</p>
					<BlogForm
						blogService={blogService}
						blogs={blogs}
						setBlogs={setBlogs}
					/>
					<h2>Blogs</h2>
					<div id='bloglist'>
						{blogs.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								blogService={blogService}
								user={user}
								onDelete={onDelete}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default App;
