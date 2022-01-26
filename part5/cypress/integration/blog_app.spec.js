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
			cy.get('html').should('not.contain', 'Logan Brock logged in');
		});
	});
	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'lgbrock', password: '123456' });
		});

		it('a new blog can be created', function () {
			cy.contains('create new blog').click();
			cy.get('#title').type('First class tests');
			cy.get('#author').type('Edsger W. Dijkstra');
			cy.get('#url').type(
				'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
			);
			cy.get('#create-blog').click();

			cy.contains('First class tests - Edsger W. Dijkstra');
		});
		it('user can like a blog', function () {
			cy.contains('create new blog').click();
			cy.get('#title').type('First class tests');
			cy.get('#author').type('Edsger W. Dijkstra');
			cy.get('#url').type(
				'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
			);
			cy.get('#create-blog').click();

			cy.contains('First class tests - Edsger W. Dijkstra').click();
			cy.contains('view').click();
			cy.contains('0');
			cy.get('#like-button').click();
			cy.contains('1');
		});
	});
});
