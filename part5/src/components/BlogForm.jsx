import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState('');

	const handleBlogChange = (event) => {
		setNewBlog(event.target.value);
	};

	const addBlog = (event) => {
		event.preventDefault();
		createBlog({
			title: newBlog,
			author: '',
			url: '',
		});
		setNewBlog('');
	};

	return (
		<form onSubmit={addBlog}>
			<h2>Create new blog</h2>
			<div>
				Title:
				<input
					id='title'
					type='text'
					value={newBlog.title}
					onChange={handleBlogChange}
				/>
			</div>
			<div>
				Author:
				<input
					id='author'
					type='text'
					value={newBlog.author}
					onChange={handleBlogChange}
				/>
			</div>
			<div>
				Url:
				<input
					id='url'
					type='text'
					value={newBlog.url}
					onChange={handleBlogChange}
				/>
			</div>
			<button type='submit'>Add</button>
		</form>
	);
};

export default BlogForm;
