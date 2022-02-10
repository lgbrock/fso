import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNotificationAction } from '../reducers/notificationReducer';

const Blog = (props) => {
	const { blog, blogService, user, onDelete } = props;
	const dispatch = useDispatch();

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const [likes, setLikes] = useState(blog.likes);
	const [visible, setVisible] = useState(false);

	const onLike = async (event) => {
		event.preventDefault();
		try {
			const response = await blogService.likeBlog(blog);
			if ({}.hasOwnProperty.call(response, 'error')) {
				dispatch(createNotificationAction('error', response.error));
			} else {
				setLikes(likes + 1);
			}
		} catch (error) {
			dispatch(createNotificationAction('error', error.message));
		}
	};

	return (
		<div style={blogStyle} className='blog'>
			{blog.title} - {blog.author} &nbsp;
			{visible && (
				<>
					<button onClick={() => setVisible(false)}>Hide Details</button>
					<br />
					&nbsp;
					<br />
					<a href={blog.url}>{blog.url}</a>
					<br />
					{likes} likes <button onClick={onLike}>Like!</button>
					<br />
					posted by {blog.user ? blog.user.name : 'Missing User'}
					{blog.user && user.id === blog.user.id && (
						<>
							&nbsp;
							<br />
							<button onClick={() => onDelete(blog)}>Delete</button>
						</>
					)}
				</>
			)}
			{!visible && (
				<button onClick={() => setVisible(true)}>View Details</button>
			)}
		</div>
	);
};

export default Blog;
