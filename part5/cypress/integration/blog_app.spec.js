describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			name: 'Logan Brock',
			username: 'lgbrock',
			password: '123456',
		};
		cy.request('POST', 'http://localhost:3003/api/users', user);
		cy.visit('http://localhost:3000');
	});

	it('LoginForm is shown', function () {
		cy.contains('username');
		cy.contains('password');
		cy.contains('login');
	});
});
