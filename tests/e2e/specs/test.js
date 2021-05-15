// https://docs.cypress.io/api/introduction/api.html

describe('Test main page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('logo are visible', () => {
    cy.get('.logo').find('img').should('be.visible');
  });

  it('menu are visible', () => {
    cy.get('ul[role="menubar"]').should('be.visible');
  });

  it('cards exists to navigate through app', () => {
    cy.get('div[role*="navigate-to"]').should('be.visible');
  });
});
