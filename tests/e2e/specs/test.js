// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('div[class="logo"]').find('img').should('be.visible');
  });
});
