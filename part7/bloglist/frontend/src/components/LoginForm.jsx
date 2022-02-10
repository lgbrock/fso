import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import loginService from '../services/login';

import { createNotificationAction } from '../reducers/notificationReducer';

const LoginForm = (props) => {
	const { blogService, setUser } = props;
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onLogin = async (event) => {
		event.preventDefault();
		const user = await loginService.login(username, password);
		if ({}.hasOwnProperty.call(user, 'error')) {
			dispatch(createNotificationAction('error', user.error));
		}
		setUsername('');
		setPassword('');
		setUser(user);

		blogService.setToken(user.token);

		window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

		dispatch(createNotificationAction('success', 'Login successful'));

		return user;
	};

	return (
		<div>
			<h1>Login to Blog App</h1>
			<form>
				Username:{' '}
				<input
					id='username'
					type='text'
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<br />
				Password:{' '}
				<input
					id='password'
					type='password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<br />
				<button id='login' type='submit' onClick={onLogin}>
					Login
				</button>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	blogService: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
};

export default LoginForm;
