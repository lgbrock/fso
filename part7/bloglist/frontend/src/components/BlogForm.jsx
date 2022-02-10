import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createNotificationAction } from '../reducers/notificationReducer';

const BlogForm = (props) => {
	const { blogService, blogs, setBlogs } = props;
	const dispatch = useDispatch();

	const [newTitle, setNewTitle] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	const [newUrl, setNewUrl] = useState('');
	const [visible, setVisible] = useState(false);

	const toggleVisibility = async (event) => {
		event.preventDefault();
		setVisible(!visible);
	};

	const onAdd = async (event) => {
		event.preventDefault();
		try {
			const newBlog = {
				title: newTitle,
				author: newAuthor,
				url: newUrl,
			};
			const response = await blogService.create(newBlog);
			setBlogs(blogs.concat(response));
			dispatch(createNotificationAction('New blog added', 'success'));
			setNewTitle('');
			setNewAuthor('');
			setNewUrl('');
		} catch (error) {
			dispatch(createNotificationAction('Error adding new blog', 'error'));
		}
	};

	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={onAdd}>
				{!visible && <button onClick={toggleVisibility}>Show Form</button>}
				{visible && (
					<div>
						<div>
							<label>
								Title:
								<input
									type='text'
									value={newTitle}
									name='title'
									onChange={({ target }) => setNewTitle(target.value)}
								/>
							</label>
						</div>
						<div>
							<label>
								Author:
								<input
									type='text'
									value={newAuthor}
									name='author'
									onChange={({ target }) => setNewAuthor(target.value)}
								/>
							</label>
						</div>
						<div>
							<label>
								Url:
								<input
									type='text'
									value={newUrl}
									name='url'
									onChange={({ target }) => setNewUrl(target.value)}
								/>
							</label>
						</div>
						<button type='submit'>Add</button>
					</div>
				)}
			</form>
		</div>
	);
};

BlogForm.protoTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
