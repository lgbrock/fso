const mongoose = require('mongoose');

// use password in terminal to get working - node mongo.js <password>
if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://lgbrock:${password}@cluster0.6rd1h.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

// find all persons in mongodb
Person.find({}).then((result) => {
	result.forEach((person) => {
		console.log(person);
	});
	mongoose.connection.close();
});

// create new person to add to mongodb
// const person = new Person({
// 	name: 'Logan Brock',
// 	number: '555-555-5555',
// });

// person.save().then((result) => {
// 	console.log(`added ${person.name} number ${person.number} to phonebook`);
// 	mongoose.connection.close();
// });
