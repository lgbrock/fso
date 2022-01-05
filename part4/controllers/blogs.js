const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// GET all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

// POST/create blog post
blogsRouter.post('/', async (request, response) => {
	if (!request.body.likes) request.body.likes = 0;
	const user = await User.findOne(); //pick any user
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
