const _ = require('lodash');

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, blog) => {
		return sum + blog.likes;
	};

	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	const reducer = (max, blog) => {
		return max.likes > blog.likes ? max : blog;
	};

	return blogs.length === 0 ? null : blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null;

	const topAuthor = _.chain(blogs)
		.groupBy('author')
		.map((value, key) => ({ author: key, blogs: value.length }))
		.maxBy((object) => object.blogs)
		.value();

	return topAuthor;
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null;

	const topAuthor = _.chain(blogs)
		.groupBy('author')
		.map((value, key) => ({
			author: key,
			likes: value.reduce((sum, blog) => sum + blog.likes, 0),
		}))
		.maxBy((object) => object.likes)
		.value();

	return topAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
