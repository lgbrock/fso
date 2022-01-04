const Note = require('../models/note');
const User = require('../models/user');

const initialNotes = [
	{
		content: 'HTML is easy',
		date: new Date(),
		important: false,
	},
	{
		content: 'Browser can execute only Javascript',
		date: new Date(),
		important: true,
	},
];

const nonExistingId = async () => {
	const note = new Note({ content: 'willremovethissoon', date: new Date() });
	await note.save();
	await note.remove();

	return note._id.toString();
};

const notesInDb = async () => {
	const notes = await Note.find({});
	return notes.map((note) => note.toJSON());
};

// helps verify the state of the db after the user is created
const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = {
	initialNotes,
	nonExistingId,
	notesInDb,
	usersInDb,
};
