const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { v1: uuid } = require('uuid');

const JWT_SECRET = 'secret';

let authors = [];

let books = [];

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/library';

console.log('connecting to', MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	});

const typeDefs = gql`
	type Author {
		name: String
		id: ID!
		born: Int
		bookCount: Int
	}

	type Book {
		title: String!
		published: Int
		author: String!
		id: ID!
		genres: [String!]!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!

		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book!
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`;

const resolvers = {
	Query: {
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: (root, args) => {
			if (!args.author && !args.genre) {
				return books;
			} else if (args.author) {
				return books.filter((book) => book.author === args.author);
			} else if (args.genre) {
				return books.filter((book) => book.genres.includes(args.genre));
			}
		},
		allAuthors: () => {
			const bookCounts = _.countBy(books, (book) => book.author);
			return authors.map((author) => ({
				...author,
				bookCount: bookCounts[author.name],
			}));
		},
		bookCount: () => books.length,
	},
	Mutation: {
		addBook: (root, args) => {
			const newBook = { ...args, id: uuid() };
			books = books.concat(newBook);

			const authorExists = authors.find(
				(author) => author.name === args.author
			);
			if (!authorExists) {
				const newAuthor = {
					name: args.author,
					born: null,
					id: uuid(),
				};
				authors = authors.concat(newAuthor);
			}

			return newBook;
		},
		editAuthor: (root, args) => {
			const author = authors.find((author) => author.name === args.name);
			if (!author) {
				return null;
			}

			author.born = args.setBornTo;
			return author;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
