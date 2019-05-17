describe('Blog listing app', function() {
  beforeEach(function() {
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
      cy.contains('Log in')
        .click()

    })
    it('name of the user is shown', function() {
      cy.contains('Salla Tero logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('Add blog')
        .click()
      cy.get('#title')
        .type('Blog created by cypress')
      cy.get('#author')
        .type('Cypress')
      cy.get('#url')
        .type('http://www.cypress.io')
      cy.get('#likes')
        .type('255')

      cy.contains('Save')
        .click()
      cy.contains('Blog created by cypres')
    })
  })



})