const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./user_api_test_helpers');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});
	const newUser = helper.initialUsers.map((user) => new User(user));
	const promiseArray = newUser.map((user) => user.save());
	await Promise.all(promiseArray);
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
	test('invalid user - username is already in database', async () => {
		const newUser = {
			username: 'testUser1',
			name: 'Test User 4',
			password: 'password',
		};

		await api.post('/api/users').send(newUser).expect(400);
	});
	test('invalid user - username less than 3 characters', async () => {
		const newUser = {
			username: 'te',
			name: 'Test User 4',
			password: 'password',
		};

		await api.post('/api/users').send(newUser).expect(400);
	});
	test('invalid user - password less than 3 characters', async () => {
		const newUser = {
			username: 'testUser5',
			name: 'Test User 4',
			password: 'pa',
		};
		// change models/user in order to work with this test
		await api.post('/api/users').send(newUser).expect(400);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
