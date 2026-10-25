describe('student-e2e', () => {
  it('redirects unauthenticated users to the login page', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.get('h1').should('contain.text', 'Student Login');
  });
});
