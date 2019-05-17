describe('Blog listing app', function() {
  //Cypress automatically clears localStorage, cookies and sessions before each test
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Salla Tero',
      username: 'sallatero',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blog listing app')
  })

  it('login form is visible', function() {
    cy.contains('Login here')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('sallatero')
      cy.get('#password')
        .type('salainen')
      cy.get('[data-cy=login]')
        .click()

    })
    it('name of the user is shown', function() {
      cy.contains('Salla Tero logged in')
    })

    it('a new blog can be created, liked, commented, and deleted', function() {

      //Adding blog
      cy.get('[data-cy=add-blog]')
        .click()
      cy.get('#title')
        .type('Blog created by cypress')
      cy.get('#author')
        .type('Cypress')
      cy.get('#url')
        .type('http://www.cypress.io')
      cy.get('#likes')
        .type('255')
      cy.get('[data-cy=save-blog]')
        .click()

      //Clicking blog to see the details
      cy.contains('Blog created by cypress by Cypress')
        .click()
      cy.contains('255')

      //Liking the blog
      cy.get('[data-cy=like-blog]')
        .click()
      cy.contains('256')

      //Commenting the blog
      cy.get('input')
        .type('first comment by cypress')
      cy.get('[data-cy=comment]')
        .click()
      cy.contains('first comment by cypress')

      //Deleting the blog
      cy.get('[data-cy=delete-blog]')
        .click()
      cy.get('.ui.celled.striped.table').get('tbody').should('be.empty')
    })
  })



})