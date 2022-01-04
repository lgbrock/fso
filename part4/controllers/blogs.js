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

module.exports = blogsRouter;
