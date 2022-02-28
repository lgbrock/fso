import React from 'react';
import { useQuery } from '@apollo/client';

import { ALL_AUTHORS } from '../queries';

const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS);
	const authors = result.data.allAuthors;

	if (result.loading) {
		return <div>Loading...</div>;

	}

	if (!props.show) {
		return null;
	}
	
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
