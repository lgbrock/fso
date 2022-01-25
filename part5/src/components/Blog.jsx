import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
	const [blogObject, setBlogObject] = useState(blog);
	const [visible, setVisible] = useState(false);
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const buttonLabel = visible ? 'hide' : 'view';

	const increaseLikes = () => {
		const updatedBlog = {
			...blogObject,
			likes: blogObject.likes + 1,
		};
		setBlogObject(updatedBlog);
	};

	const removeBlog = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			await blogService.remove(blog.id);

			let blogs = await blogService.getAll();
			blogs.sort((a, b) => b.likes - a.likes);
			setBlogObject(blogs);
		}
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
			<div>
				<p>
					{blog.title} - {blog.author}{' '}
					<button onClick={toggleVisibility}>{buttonLabel}</button>
				</p>
			</div>
			<div style={showWhenVisible}>
				<p>{blog.url}</p>
				<p>
					likes {blogObject.likes} <button onClick={increaseLikes}>like</button>
				</p>

				<button onClick={removeBlog}>remove</button>
			</div>
		</div>
	);
};

export default Blog;
