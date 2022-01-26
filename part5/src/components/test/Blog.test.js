import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from '../Blog';

test('renders content', () => {
	const blog = {
		title: 'Test title',
		author: 'Test author',
	};

	const component = render(<Blog blog={blog} />);

	expect(component.container).toHaveTextContent('Test title');
	expect(component.container).toHaveTextContent('Test author');
});
