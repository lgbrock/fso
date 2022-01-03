const { before } = require('lodash');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

// check if blog post are returned in json format
test('blogs are returned in json format', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
}, 100000);

// test if correct number of blogs are returned in json format
test('correct number of blogs are returned', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(7);
});

// // test verifies that the unique identifier property of the blog posts is named id
test('unique identifier property of the blog posts is named id', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body[0].id).toBeDefined();
});

// test that verifies a successful new blog post
test('a successful new blog post', async () => {
	const newBlog = {
		title: 'Test blog',
		author: 'Test author',
		url: 'http://www.test.com',
		likes: 5,
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const response = await api.get('/api/blogs');

	const titles = response.body.map((r) => r.title);

	expect(response.body).toHaveLength(Blog.length + 1);
	expect(titles).toContain('Test blog');
});

afterAll(() => {
	mongoose.connection.close();
});
