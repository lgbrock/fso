const mongoose = require('mongoose');

// use password in terminal to get working - node mongo.js <password>
if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://lgbrock:${password}@cluster0.wdtkk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});