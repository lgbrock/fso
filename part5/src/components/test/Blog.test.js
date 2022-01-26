import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../Blog';

describe('When a blog is created', () => {
	test('the title and author are rendered', () => {
		const blog = {
			title: 'Test title',
			author: 'Test author',
		};

		const component = render(<Blog blog={blog} />);

		expect(component.container).toHaveTextContent('Test title');
		expect(component.container).toHaveTextContent('Test author');
	});

	test('the url and number of likes is shown once the event handler is clicked', () => {
		const blog = {
			title: 'Test title',
			author: 'Test author',
			url: 'www.test.com',
			likes: 5,
		};

		const mockHandler = jest.fn();

		const component = render(<Blog blog={blog} onClick={mockHandler} />);

		const button = component.getByText('view');
		fireEvent.click(button);

		expect(component.container).toHaveTextContent('www.test.com');
		expect(component.container).toHaveTextContent('5');
	});

	test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
		const blog = {
			title: 'Test title',
			author: 'Test author',
			url: 'www.test.com',
			likes: 5,
		};

		const mockHandler = jest.fn();

		const component = render(<Blog blog={blog} onClick={mockHandler} />);

		const button = component.getByText('view');
		fireEvent.click(button);

		const likeButton = component.getByText('like');
		fireEvent.click(likeButton);
		fireEvent.click(likeButton);

		expect(component.container).toHaveTextContent('7');
	});
});
