import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
	{
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

export const ALL_BOOKS = gql`
	{
		allBooks {
			title
			author
			published
			genres
		}
	}
`;
