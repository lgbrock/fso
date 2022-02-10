import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createNotificationAction } from '../reducers/notificationReducer';

const BlogForm = (props) => {
	const { blogService, blogs, setBlogs } = props;
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [visible, setVisible] = useState(false);

	const toggleVisibility = async (event) => {
		event.preventDefault();
		setVisible(!visible);
	};

	const onAdd = async (event) => {
		event.preventDefault();
		try {
			const newBlog = await blogService.addBlog({ title, author, url });
			if ({}.hasOwnProperty.call(newBlog, 'error')) {
				dispatch(createNotificationAction('error', newBlog.error));
			} else {
				setBlogs([...blogs, newBlog]);
				dispatch(
					createNotificationAction(
						'success',
						`Added blog "${newBlog.title}" by author "${newBlog.author}"`
					)
				);
			}
			setTitle('');
			setAuthor('');
			setUrl('');
			setVisible(false);
		} catch (error) {
			dispatch(createNotificationAction('error', error.message));
		}
	};

	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={onAdd}>
				{!visible && <button onClick={toggleVisibility}>Show Form</button>}
				{visible && (
					<>
						Title:{' '}
						<input
							id='title'
							type='text'
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
						<br />
						Author:{' '}
						<input
							id='author'
							type='text'
							value={author}
							onChange={(event) => setAuthor(event.target.value)}
						/>
						<br />
						URL:{' '}
						<input
							id='url'
							type='text'
							value={url}
							onChange={(event) => setUrl(event.target.value)}
						/>
						<br />
						<button id='addBlog' type='submit'>
							Add New Blog
						</button>
						<button onClick={toggleVisibility}>Hide Form</button>
					</>
				)}
			</form>
		</div>
	);
};

BlogForm.protoTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
