const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// connect to monogodb
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log('Error connecting to MongoDB:', error.message);
		process.exit(1);
	});

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// find all notes in mongodb
Note.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});

// // find only important notes
// Note.find({ important: true }).then((result) => {
// 	result.forEach((note) => {
// 		console.log(note);
// 	});
// 	mongoose.connection.close();
// });

// create new notes to add to mongodb
// const note = new Note({
// 	content: 'Test after creating dotenv file',
// 	date: new Date(),
// 	important: true,
// });

// note.save().then((result) => {
// 	console.log('note saved!');
// 	mongoose.connection.close();
// });
