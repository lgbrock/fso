describe('Note app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user = {
			name: 'Logan Brock',
			username: 'lgbrock',
			password: '123456',
		};
		cy.request('POST', 'http://localhost:3001/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function () {
		cy.contains('Notes');
		cy.contains(
			'Note app, Department of Computer Science, University of Helsinki 2021'
		);
	});

	it('login form can be opened', function () {
		cy.contains('log in').click();
	});

	it('user can login', function () {
		cy.contains('log in').click();
		cy.get('#username').type('lgbrock');
		cy.get('#password').type('123456');
		cy.get('#login-button').click();

		cy.contains('Logan Brock logged in');
	});

	it('login fails with wrong password', function () {
		cy.contains('log in').click();
		cy.get('#username').type('lgbrock');
		cy.get('#password').type('wrong');
		cy.get('#login-button').click();

		cy.get('.error')
			.should('contain', 'Wrong credentials')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid');

		cy.get('html').should('not.contain', 'Logan Brock logged in');
	});

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'lgbrock', password: '123456' });
		});

		it('a new note can be created', function () {
			cy.contains('new note').click();
			cy.get('input').type('a note created by cypress');
			cy.contains('save').click();
			cy.contains('show all').click();
			cy.contains('a note created by cypress');
		});

		describe('and several notes exist', function () {
			beforeEach(function () {
				cy.createNote({ content: 'first note', important: false });
				cy.createNote({ content: 'second note', important: false });
				cy.createNote({ content: 'third note', important: false });
			});

			it('one of those can be made important', function () {
				cy.contains('show all').click();
				cy.contains('second note').parent().find('button').as('theButton');
				cy.get('@theButton').click();
				cy.get('@theButton').should('contain', 'make not important');
			});
		});
	});
});
