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
		it('user can delete a blog', function () {
			cy.contains('create new blog').click();
			cy.get('#title').type('First class tests');
			cy.get('#author').type('Edsger W. Dijkstra');
			cy.get('#url').type(
				'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
			);
			cy.get('#create-blog').click();

			cy.contains('First class tests - Edsger W. Dijkstra').click();
			cy.contains('view').click();
			cy.contains('remove').click();
			cy.get('#url').should(
				'not.contain',
				'First class tests - Edsger W. Dijkstra'
			);
		});
	});
	describe('Blogs ordered by number of likes', function () {
		beforeEach(function () {
			cy.login({ username: 'lgbrock', password: '123456' });
			cy.createBlog({
				author: 'John Doe',
				title: 'test1',
				url: 'http://example.com./test1',
			});
			cy.createBlog({
				author: 'John Doe',
				title: 'test2',
				url: 'http://example.com./test2',
			});
			cy.createBlog({
				author: 'Jane Doe',
				title: 'test3',
				url: 'http://example.com./test3',
			});

			cy.contains('test1').parent().parent().as('blog1');
			cy.contains('test2').parent().parent().as('blog2');
			cy.contains('test3').parent().parent().as('blog3');
		});

		it.only('they are ordered by number of likes', function () {
			cy.get('@blog1').contains('view').click();
			cy.get('@blog2').contains('view').click();
			cy.get('@blog3').contains('view').click();
			cy.get('@blog1').contains('like').as('like1');
			cy.get('@blog2').contains('like').as('like2');
			cy.get('@blog3').contains('like').as('like3');

			cy.get('@like2').click();
			cy.wait(500);
			cy.get('@like1').click();
			cy.wait(500);
			cy.get('@like1').click();
			cy.wait(500);
			cy.get('@like3').click();
			cy.wait(500);
			cy.get('@like3').click();
			cy.wait(500);
			cy.get('@like3').click();
			cy.wait(500);

			cy.get('.blog').then((blogs) => {
				expect(blogs[0]).to.contain('test3');
				expect(blogs[1]).to.contain('test2');
				expect(blogs[2]).to.contain('test1');
			});
		});
	});
});
