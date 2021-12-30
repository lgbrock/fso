// SERVER
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const morgan = require('morgan');
const Person = require('./models/person');

// middleware
app.use(express.static('build'));
app.use(cors());
app.use(express.json());

// middleware

// error handler middleware - must be the last called middleware
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
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

// GET all persons in database
app.get('/api/persons', (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

// GET info of people in database
app.get('/api/info', (request, response, next) => {
	const date = new Date(Date.now());
	Person.find({})
		.then((persons) => {
			response.send(
				`<p>Phonebook has info for ${persons.length} people</p>
			<p>${date}</p>`
			);
		})
		.catch((error) => next(error));
});

// GET person by id in database
app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

// POST/create a new person and save to database
app.post('/api/persons', (request, response, next) => {
	const body = request.body;

	const person = new Person({
		name: body.name,
		number: body.number,
		// id: generateId(),
	});

	person
		.save()
		.then((savedPerson) => savedPerson.toJSON())
		.then((savedPerson) => response.json(savedPerson))
		.catch((error) => next(error));
});

// DELETE person from database
app.delete('/api/persons/:id', (require, result, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then((result) => {
			result.status(204).end();
		})
		.catch((error) => next(error));
});

// PUT/update phonebook entry for name that is already in database
app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(request.params.id, person, {
		new: true,
		runValidators: true,
	})
		.then((updatedPerson) => response.json(updatedPerson))
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

// * -- CREATE PERSON WITHOUT MULTIPLE ENTRIES FOR SAME NAME -- *
// app.post('/api/persons', (request, response) => {
// 	const body = request.body;

// 	if (!body.name || !body.number) {
// 		return response.status(400).json({
// 			error: 'name or number missing',
// 		});
// 	}

// 	// name already exists
// 	const nameExists = persons.some((person) => person.name === body.name);

// 	if (nameExists) {
// 		return response.status(400).json({
// 			error: 'name must be unique',
// 		});
// 	}

// 	const person = {
// 		name: body.name,
// 		number: body.number,
// 		id: generateId(),
// 	};

// 	persons = persons.concat(person);

// 	response.json(person);
// });

// * -- MORGAN -- *
// show body of name added to phonebook in morgan - more secure
// morgan.token('body', (req) => {
// 	return JSON.stringify(req.body);
// });

// app.use(
// 	morgan(':method :url :status :res[content-length] - :response-time ms :body')
// );

// * -- GENERATE RANDOM ID FOR PERSON -- *
// const generateId = () => {
// 	// create random id
// 	const randomId = Math.floor(Math.random() * 10000000) + 10000000;
// 	// check if id already exists
// 	const idExists = Person.findById(randomId);
// 	if (idExists) {
// 		null;
// 	} else {
// 		return randomId;
// 	}
// };
