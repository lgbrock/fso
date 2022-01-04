const { before } = require('lodash');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
	await Blog.deleteMany({}); //empty the collection

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe('when there is initially some blogs saved', () => {
	// check if blog post are returned in json format
	test('blogs are returned in json format', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	// test if correct number of blogs are returned in json format
	test('correct number of blogs are returned', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body).toHaveLength(6);
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

		console.log('blog response', response.body);
		const contents = response.body.map((r) => r.title);

		expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
		expect(contents).toContain('Test blog');
	});

	// test that verifies the likes property is missing from the request
	test('the likes property is missing from the request', async () => {
		const newBlog = {
			title: 'Test blog',
			author: 'Test author',
			url: 'http://www.test.com',
		};

		await api.post('/api/blogs').send(newBlog).expect(201);

		const response = await api.get('/api/blogs');

		console.log('blog response', response.body);
		const contents = response.body.find((r) => r.title === newBlog.title);

		expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

		expect(contents.likes).toBe(0);
	});

	// test that verifies 400 code when tile and url are missing
	test('400 code when tile and url are missing', async () => {
		const newBlog = {
			author: 'Test author',
			url: 'http://www.test.com',
			likes: 5,
		};

		await api.post('/api/blogs').send(newBlog).expect(400);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
