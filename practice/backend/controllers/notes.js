const jwt = require('jsonwebtoken');
const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

// GET all notes
notesRouter.get('/', async (request, response) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 });

	response.json(notes.map((note) => note.toJSON()));
});

// GET note by id
notesRouter.get('/:id', async (request, response) => {
	const note = await Note.findById(request.params.id);
	if (note) {
		response.json(note.toJSON());
	} else {
		response.status(404).end();
	}
});

// GET jwt
const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

// POST/create new note
notesRouter.post('/', async (request, response, next) => {
	const body = request.body;

	const user = await User.findById(body.userId);

	const note = new Note({
		content: body.content,
		important: body.important === undefined ? false : body.important,
		date: new Date(),
		user: user._id,
	});

	const savedNote = await note.save();
	user.notes = user.notes.concat(savedNote._id);
	await user.save();

	response.json(savedNote);
});

// DELETE note
notesRouter.delete('/:id', async (request, response) => {
	await Note.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

// PUT/update note by id
notesRouter.put('/:id', (request, response, next) => {
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote.toJSON());
		})
		.catch((error) => next(error));
});

module.exports = notesRouter;
