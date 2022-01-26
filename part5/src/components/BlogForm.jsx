import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
	// const [newBlog, setNewBlog] = useState('');
	const [newTitle, setNewTitle] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	const [newUrl, setNewUrl] = useState('');

	// const handleChange = (event) => {
	// 	setNewBlog(event.target.value);
	// };

	const handleTitleChange = (event) => {
		setNewTitle(event.target.value);
	};

	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value);
	};

	const handleUrlChange = (event) => {
		setNewUrl(event.target.value);
	};

	const addBlog = (event) => {
		event.preventDefault();
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		});
		setNewTitle('');
		setNewAuthor('');
		setNewUrl('');
	};

	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={addBlog}>
				<div>
					Title:{' '}
					<input
						id='title'
						type='text'
						value={newTitle}
						name='title'
						onChange={handleTitleChange}
					/>
				</div>
				<div>
					Author:{' '}
					<input
						id='author'
						type='text'
						value={newAuthor}
						name='author'
						onChange={handleAuthorChange}
					/>
				</div>
				<div>
					URL:{' '}
					<input
						id='url'
						type='text'
						value={newUrl}
						name='url'
						onChange={handleUrlChange}
					/>
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

BlogForm.protoTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
