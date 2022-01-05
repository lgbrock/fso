const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./user_api_test_helpers');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});
	console.log('cleared users');

	console.log('adding new blog');
	const newUser = helper.initialUsers.map((user) => new User(user));
	const promiseArray = newUser.map((user) => user.save());
	await Promise.all(promiseArray);

	console.log('dunzo');
});

describe('creating a new user', () => {
	test('creating a valid user', async () => {
		const newUser = {
			username: 'testUser4',
			name: 'Test User 4',
			password: 'password',
		};

		await api.post('/api/users').send(newUser).expect(201);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
