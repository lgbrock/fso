const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
	const body = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const newUser = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	});

	const savedUser = await newUser.save();
	response.status(201).json(savedUser);
});

// GET all users from helper module
usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { blogs: 0 });
	response.json(users.map((user) => user.toJSON()));
});

module.exports = usersRouter;
