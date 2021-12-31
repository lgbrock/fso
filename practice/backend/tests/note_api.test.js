const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

test('notes are returned as json', async () => {
	await api
		.get('/api/notes')
		.expect(200)
		.expect('Content-Type', /application\/json/);
}, 100000);

test('all notes are returned', async () => {
	const response = await api.get('/api/notes');

	expect(response.body).toHaveLength(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
	const response = await api.get('/api/notes');

	const contents = response.body.map((r) => r.content);
	expect(contents).toContain('Browser can execute only Javascript');
});

afterAll(() => {
	mongoose.connection.close();
});
