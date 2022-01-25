import React, { useState } from 'react';

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

	const removeBlog = () => {
		const updatedBlog = {
			...blogObject,
			deleted: true,
		};
		setBlogObject(updatedBlog);
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
				<p>{blog.title}</p>
				<p>{blog.url}</p>
				<p>
					likes {blogObject.likes} <button onClick={increaseLikes}>like</button>
				</p>
				<p>{blog.author}</p>
				<button onClick={removeBlog}>remove</button>
			</div>
		</div>
	);
};

export default Blog;
