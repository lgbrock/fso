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

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login');
			cy.get(':nth-child(2) > input').type('lgbrock');
			cy.get(':nth-child(3) > input').type('123456');
			cy.get('button').click();
			cy.contains('Logan Brock logged in');
		});

		it('fails with wrong credentials', function () {
			cy.contains('login');
			cy.get(':nth-child(2) > input').type('lgbrock');
			cy.get(':nth-child(3) > input').type('wrong');
			cy.get('button').click();
			cy.get('.error').contains('wrong credentials');
		});
	});
});
