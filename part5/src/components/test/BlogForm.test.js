import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from '../BlogForm';

describe('When a BlogForm is successfully created,', () => {
	test('<BlogForm /> updates parent state and calls onSubmit', () => {
		const createBlog = jest.fn();

		const component = render(<BlogForm createBlog={createBlog} />);

		const input = component.container.querySelector('input');
		const form = component.container.querySelector('form');

		fireEvent.change(input, {
			target: { value: 'testing of forms could be easier' },
		});
		fireEvent.submit(form);

		expect(createBlog.mock.calls).toHaveLength(1);
		expect(createBlog.mock.calls[0][0].title).toBe(
			'testing of forms could be easier'
		);
	});
});
