const Note = require('../models/note');
const User = require('../models/user');

const initialNotes = [
	{
		content: 'HTML is easy',
		important: false,
		_id: 221212,
		user: 123456,
	},
	{
		content: 'The most important operations of HTTP protocol are GET and POST',
		important: true,
		_id: 221255,
		user: 123456,
	},
	{
		content: 'A proper dinosaur codes with Java',
		important: false,
		_id: 221244,
		user: 141414,
	},
];

const initialUsers = [
	{
		username: 'mluukkai',
		_id: 123456,
		notes: [
			{
				content: 'HTML is easy',
				important: false,
			},
			{
				content:
					'The most important operations of HTTP protocol are GET and POST',
				important: true,
			},
		],
	},
	{
		username: 'hellas',
		_id: 141414,
		notes: [
			{
				content: 'A proper dinosaur codes with Java',
				important: false,
			},
		],
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
	initialUsers,
	nonExistingId,
	notesInDb,
	usersInDb,
};
