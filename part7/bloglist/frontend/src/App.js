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
		blogService
			.getAll()
			.then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem(
			'fsoblogapp.loggedinuser'
		);
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			setUser(user);
		}
	}, []);

	const onLogout = () => {
		window.localStorage.removeItem('fsoblogapp.loggedinuser');
		setUser(null);
	};

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
						Welcome, {user.name}!<button onClick={onLogout}>Logout</button>
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
