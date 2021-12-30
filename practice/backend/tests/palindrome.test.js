const palindrome = require('../utils/for_testing').palindrome;

// test description as a string
test('palindrome of a', () => {
	const result = palindrome('a');

	expect(result).toBe('a');
});

// defines the functionality for the test case
test('palindrome of react', () => {
	const result = palindrome('react');

	expect(result).toBe('tcaer');
});

test('palindrome of releveler', () => {
	const result = palindrome('releveler');

	expect(result).toBe('releveler');
});
