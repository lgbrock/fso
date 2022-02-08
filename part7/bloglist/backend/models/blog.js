const mongoose = require('mongoose');

// Blog Schema
const blogSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	author: {
		type: String,
	},
	url: {
		type: String,
	},
	likes: {
		type: Number,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

// how to not return the mongo versioning field, __v, to the frontend
blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
