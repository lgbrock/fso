// SERVER
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/note');

// middleware
app.use(express.static('build'));
app.use(cors());
app.use(express.json());

// error handler middleware - must be the last called middleware
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	next(error);
};

// Displays contents of notes in terminal - more secure
const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:  ', request.path);
	console.log('Body:  ', request.body);
	console.log('---');
	next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
	res.send('<h1>Hello, Turkey Dog!</h1>');
});

app.get('/api/notes', (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes);
	});
});

// Generate random id for each note
// const generateId = () => {
// 	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
// 	return maxId + 1;
// };

app.post('/api/notes', (request, response) => {
	const body = request.body;

	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' });
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	});

	note.save().then((savedNote) => {
		response.json(savedNote);
	});
});

// get note by id
app.get('/api/notes/:id', (request, response) => {
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => {
			console.log(error);
			response.status(400).send({ error: 'malformatted id' });
		});
});

// delete note
app.delete('/api/notes/:id', (request, response) => {
	Note.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

// update note by id
app.put('/api/notes/:id', (request, response, next) => {
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote);
		})
		.catch((error) => next(error));
});

// Displays error message in window if endpoint is not found
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
