const User = require('../models/user');
const initialUsers = [
	{
		username: 'testUser1',
		password: 'password',
		name: 'Test User 1',
	},
	{
		username: 'testUser2',
		password: 'password',
		name: 'Test User 2',
	},
	{
		username: 'testUser3',
		password: 'password',
		name: 'Test User 3',
	},
];

usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = {
	initialUsers,
};
