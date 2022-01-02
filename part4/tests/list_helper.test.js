const listHelper = require('../utils/list_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

test('dummy returns one', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

describe('if total likes', () => {
	test('of list is empty, return error', () => {
		const result = listHelper.totalLikes([]);

		expect(result).toBe(0);
	});

	test('of list has only one blog, return likes of that blog', () => {
		const result = listHelper.totalLikes(listWithOneBlog);

		expect(result).toBe(5);
	});

	test('of list has multiple blogs, return total likes of all blogs', () => {
		const result = listHelper.totalLikes(blogs);

		expect(result).toBe(36);
	});
});

describe('favorite blog', () => {
	test('of list is empty, return error', () => {
		const result = listHelper.favoriteBlog([]);

		expect(result).toBe(null);
	});

	test('of list has only one blog, return that blog', () => {
		const result = listHelper.favoriteBlog(listWithOneBlog);

		expect(result).toEqual(listWithOneBlog[0]);
	});

	test('of list has multiple blogs, return blog with most likes', () => {
		const result = listHelper.favoriteBlog(blogs);

		expect(result).toMatchObject({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		});
	});
});

describe('most blogs', () => {
	test('of list is empty, return error', () => {
		const result = listHelper.mostBlogs([]);

		expect(result).toBe(null);
	});

	test('of list has only one blog, return that blog', () => {
		const result = listHelper.mostBlogs(listWithOneBlog);

		expect(result).toMatchObject({
			author: 'Edsger W. Dijkstra',
			blogs: 1,
		});
	});

	test('of list has multiple blogs, return author with most blogs', () => {
		const result = listHelper.mostBlogs(blogs);

		expect(result).toMatchObject({
			author: 'Robert C. Martin',
			blogs: 3,
		});
	});
});

describe('most likes', () => {
	test('of list is empty, return error', () => {
		const result = listHelper.mostLikes([]);

		expect(result).toBe(null);
	});

	test('of list has only one blog, return that blog', () => {
		const result = listHelper.mostLikes(listWithOneBlog);

		expect(result).toMatchObject({
			author: 'Edsger W. Dijkstra',
			likes: 5,
		});
	});

	test('of list has multiple blogs, return author with most likes', () => {
		const result = listHelper.mostLikes(blogs);

		expect(result).toMatchObject({
			author: 'Edsger W. Dijkstra',
			likes: 17,
		});
	});
});

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

	expect(response.body).toHaveLength(3);
});

afterAll(() => {
	mongoose.connection.close();
});
