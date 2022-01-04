const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// GET all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs.map((blog) => blog.toJSON()));
});

// POST/create blog post
blogsRouter.post('/', (request, response) => {
	if (!request.body.likes) request.body.likes = 0;
	const blog = new Blog(request.body);

	blog.save().then((result) => response.status(201).json(result));
});

// DELETE blog posts
blogsRouter.delete('/:id', async (request, response) => {
	const result = await Blog.findByIdAndRemove(request.params.id);

	if (!result) {
		return response.status(404).send({ error: 'BLOG_NOT_FOUND' });
	}
	response.status(204).end();
});

// PUT/update blog posts
blogsRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
		new: true,
	});
	if (!result) {
		return response.status(404).send({ error: 'BLOG_NOT_FOUND' });
	}
	response.status(200).json(result);
});

module.exports = blogsRouter;
