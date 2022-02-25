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
