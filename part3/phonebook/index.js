// SERVER
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// middleware
app.use(express.static('build'));
app.use(cors());
app.use(express.json());

// middleware
// show body of name added to phonebook in morgan - more secure
// morgan.token('body', (req) => {
// 	return JSON.stringify(req.body);
// });

// app.use(
// 	morgan(':method :url :status :res[content-length] - :response-time ms :body')
// );

// Displays contents of notes in terminal - more secure
const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:  ', request.path);
	console.log('Body:  ', request.body);
	console.log('---');
	next();
};

app.use(requestLogger);

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.get('/api/info', (request, response) => {
	const date = new Date();
	const info = `<p>Phonebook has info for ${persons.length} people</p>
					<p>${date}</p>`;
	response.send(info);
});

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

const generateId = () => {
	// create random id
	const randomdId = Math.floor(Math.random() * 10000000) + 10000000;
	// check if id already exists
	const idExists = persons.some((person) => person.id === randomdId);
	// if id exists, generate new id
	if (idExists) {
		return generateId();
	}
	// if id does not exist, return id
	return randomdId;
};

app.post('/api/persons', (request, response) => {
	const body = request.body;

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'name or number missing',
		});
	}

	// name already exists
	const nameExists = persons.some((person) => person.name === body.name);

	if (nameExists) {
		return response.status(400).json({
			error: 'name must be unique',
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	};

	persons = persons.concat(person);

	response.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		persons = persons.filter((person) => person.id !== id);
		res.status(204).end();
	} else {
		res.status(404).end();
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
