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

// GET all persons in database
app.get('/api/persons', (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

// GET info of people in database
app.get('/api/info', (request, response) => {
	const date = new Date();
	const info = Person.find({})
		.then((persons) => {
			response.send(
				`<p>Phonebook has info for ${persons.length} people</p>
			<p>${date}</p>`
			);
			return info;
		})
		.catch((error) => {
			console.log(error);
		});
});

// GET person by id oin database
app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => {
			console.log(error);
			response.status(400).send({ error: 'malformatted id' });
		});
});

// generate random id for person
const generateId = () => {
	// create random id
	const randomId = Math.floor(Math.random() * 10000000) + 10000000;
	// check if id already exists
	const idExists = Person.findById(randomId);
	if (idExists) {
		null;
	} else {
		return randomId;
	}
};

// POST/create a new person and save to database
app.post('/api/persons', (request, response) => {
	const body = request.body;

	if (body.name === undefined) {
		return response.status(400).json({ error: 'name missing' });
	} else if (body.number === undefined) {
		return response.status(400).json({ error: 'number missing' });
	}

	const person = new Person({
		name: body.name,
		number: body.number,
		id: generateId(),
	});

	person.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

// DELETE person from database
app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then((result) => {
			res.status(204).end();
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

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson);
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

// create person without multiple entries
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

// show body of name added to phonebook in morgan - more secure
// morgan.token('body', (req) => {
// 	return JSON.stringify(req.body);
// });

// app.use(
// 	morgan(':method :url :status :res[content-length] - :response-time ms :body')
// );