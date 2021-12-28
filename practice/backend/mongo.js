const mongoose = require('mongoose');

// connect to monogodb
// mongoose
// 	.connect(process.env.MONGO_URL, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		console.log('Connected to MongoDB');
// 	})
// 	.catch((error) => {
// 		console.log('Error connecting to MongoDB:', error.message);
// 		process.exit(1);
// 	});

// use password in terminal to get working - node mongo.js <password>
if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://lgbrock:${password}@cluster0.i3ocz.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
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
