const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// GET all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { blogs: 0 });

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
	if (!request.body.likes) request.body.likes = 0;
	const token = getTokenFrom(request);
	let decodedToken = null;

	try {
		decodedToken = jwt.verify(token, process.env.SECRET);
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}
	} catch (error) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(decodedToken.id);

	console.log('user', user);
	const newBlogPayload = {
		...request.body,
		user: user._id,
	};
	const newBlog = new Blog(newBlogPayload);
	const blogResult = await newBlog.save();

	user.blogs = user.blogs.concat(blogResult._id);
	user.save();

	response.status(201).json(blogResult);
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
