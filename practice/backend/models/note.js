const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	date: {
		type: Date,
	},
	important: Boolean,
});

// how to not return the mongo versioning field, __v, to the frontend
noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Note', noteSchema);
