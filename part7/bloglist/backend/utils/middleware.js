const logger = require('../utils/logger');
const User = require('../models/user');

// Display contents of notes in terminal
const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	logger.info('---');
	next();
};

// Display message in window if endpoint is not found
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

// Error handler
const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token',
		});
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'token expired',
		});
	}

	logger.error(error.message);

	next(error);
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7);
	}

	next();
};

// finds user and set it to the request object
const userExtractor = (request, response, next) => {
	const token = request.get('authorization');
	if (token) {
		const decodedToken = jwt.verify(token, process.env.SECRET);
		const user = User.findById(decodedToken.id);
		if (user) {
			request.user = user;
			next();
		} else {
			response.status(401).json({ error: 'token missing or invalid' });
		}
	} else {
		response.status(401).json({ error: 'token missing or invalid' });
	}
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
