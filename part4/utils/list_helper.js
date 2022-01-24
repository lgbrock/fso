const _ = require('lodash');

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0;
	}

	return blogs.reduce((s, b) => s + b.likes, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const withMostVotes = (best, current) => {
		if (!best) {
			return current;
		}

		return best.likes > current.likes ? best : current;
	};

	return blogs.reduce(withMostVotes, null);
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const blogsByAuthor = _.toPairs(_.groupBy(blogs, (b) => b.author));
	const blockCountByAuthor = blogsByAuthor
		.map(([author, blogs]) => ({
			author,
			blogs: blogs.length,
		}))
		.sort((a1, a2) => a2.blogs - a1.blogs);

	return blockCountByAuthor[0];
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const blogsByAuthor = _.toPairs(_.groupBy(blogs, (b) => b.author));
	const likeCountByAuthor = blogsByAuthor
		.map(([author, blogs]) => ({
			author,
			likes: blogs.reduce((s, b) => s + b.likes, 0),
		}))
		.sort((a1, a2) => a2.likes - a1.likes);

	return likeCountByAuthor[0];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };

// --* HELPERS *--
// const _ = require('lodash');

// const totalLikes = (blogs) => {
// 	const reducer = (sum, blog) => {
// 		return sum + blog.likes;
// 	};

// 	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
// };

// const favoriteBlog = (blogs) => {
// 	const reducer = (max, blog) => {
// 		return max.likes > blog.likes ? max : blog;
// 	};

// 	return blogs.length === 0 ? null : blogs.reduce(reducer);
// };

// const mostBlogs = (blogs) => {
// 	if (blogs.length === 0) return null;

// 	const topAuthor = _.chain(blogs)
// 		.groupBy('author')
// 		.map((value, key) => ({ author: key, blogs: value.length }))
// 		.maxBy((object) => object.blogs)
// 		.value();

// 	return topAuthor;
// };

// const mostLikes = (blogs) => {
// 	if (blogs.length === 0) return null;

// 	const topAuthor = _.chain(blogs)
// 		.groupBy('author')
// 		.map((value, key) => ({
// 			author: key,
// 			likes: value.reduce((sum, blog) => sum + blog.likes, 0),
// 		}))
// 		.maxBy((object) => object.likes)
// 		.value();

// 	return topAuthor;
// };
