const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// GET all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { blogs: 1, username: 1 });

	response.json(blogs.map((blog) => blog.toJSON()));
});

// GET JWT token
const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

// POST/create blog post
blogsRouter.post('/', async (request, response) => {
	const body = request.body;

	const user = request.user;

	const blog = new Blog({
		url: body.url,
		title: body.title,
		author: body.author,
		user: user._id,
		likes: body.likes,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.json(savedBlog);
});

// DELETE blog posts
blogsRouter.delete('/:id', async (request, response) => {
	const result = await Blog.findByIdAndRemove(request.params.id);

	const user = request.user;

	user.blogs = user.blogs.filter(
		(blog) => blog.toString() !== result._id.toString()
	);

	await user.save();

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
