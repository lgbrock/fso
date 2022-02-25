import React from 'react';
import { useQuery } from '@apollo/client';

import { ALL_AUTHORS } from '../queries';

const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS);
	if (!props.show) {
		return null;
	}

	if (result.loading) {
		<div>Loading...</div>;
	}

	const authors = result.data.allAuthors;

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
							<strong>name</strong>
						</th>
						<th>
							<strong>born</strong>
						</th>
						<th>
							<strong>book count</strong>
						</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.id}</td>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Authors;
