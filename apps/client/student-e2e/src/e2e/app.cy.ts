describe('student-e2e', () => {
  it('redirects unauthenticated users to the login page', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.get('h1').should('contain.text', 'Student Login');
  });

  it('allows an authenticated user to reach the protected home route', () => {
    // No backend runs in e2e, so we seed a valid-shaped (unverified) token directly;
    // the app never checks the signature client-side, only the decoded payload.
    const payload = {
      sub: 'e2e-user',
      role: 'student',
      org_id: 'e2e-org',
      iat: 0,
      exp: 9999999999,
    };
    const fakeAccessToken = `e30.${btoa(JSON.stringify(payload))}.sig`;

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('educrm_access_token', fakeAccessToken);
        win.localStorage.setItem('educrm_refresh_token', 'e2e-refresh-token');
      },
    });

    cy.url().should('not.include', '/login');
  });
});
