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

module.exports = { dummy, totalLikes, favoriteBlog };
