import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS);
	const [editAuthor] = useMutation(EDIT_AUTHOR);

	if (!result.data) {
		return <div>Loading...</div>;
	}

	const authors = result.data.allAuthors;

	const submit = async (event) => {
		event.preventDefault();

		const name = event.target.name.value;
		const setBornTo = parseInt(event.target.born.value);

		await editAuthor({ variables: { name, setBornTo } });

		event.target.name.value = '';
	};

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
			<h2>set birthyear</h2>
			<form onSubmit={submit}>
				<select name='name'>
					{authors.map((a) => (
						<option key={a.name} value={a.name}>
							{a.name}
						</option>
					))}
				</select>
				<div>
					born
					<input type='number' name='born' />
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	);
};

export default Authors;
