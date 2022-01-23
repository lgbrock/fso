import React from 'react';

const LoginForm = ({ handleLogin, username, password }) => {
	return (
		<div>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={(e) => this.setState({ username: e.target.value })}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={(e) => this.setState({ password: e.target.value })}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
};

export default LoginForm;
