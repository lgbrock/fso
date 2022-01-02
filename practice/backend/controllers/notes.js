const notesRouter = require('express').Router();
const Note = require('../models/note');

// GET all notes
notesRouter.get('/', async (request, response) => {
	const notes = await Note.find({});
	response.json(notes.map((note) => note.toJSON()));
});

// GET note by id
notesRouter.get('/:id', async (request, response, next) => {
	const note = await Note.findById(request.params.id);
	if (note) {
		response.json(note.toJSON());
	} else {
		response.status(404).end();
	}
});

notesRouter.post('/', async (request, response, next) => {
	const body = request.body;

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	});

	const savedNote = await note.save();
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
		.then((updatedNote) => response.json(updatedNote))
		.catch((error) => next(error));
});

module.exports = notesRouter;
