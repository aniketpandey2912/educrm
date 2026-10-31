// OpenAPI fragment for apps/server/src/routes/auth.routes.ts. Only touch this file when those routes change.
export const schemas = {
  SignupRequest: {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'password', 'orgSlug'],
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
      orgSlug: { type: 'string' },
    },
  },
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  LoginResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      accessToken: { type: 'string' },
      refreshToken: { type: 'string' },
    },
  },
  LogoutRequest: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' },
    },
  },
  RefreshTokenRequest: {
    type: 'object',
    required: ['refreshToken'],
    properties: {
      refreshToken: { type: 'string' },
    },
  },
  RefreshTokenResponse: {
    type: 'object',
    properties: {
      accessToken: { type: 'string' },
    },
  },
};

export const paths = {
  '/auth/signup': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new student account',
      description:
        'Public self-registration for students only. Staff/admin roles are provisioned separately.',
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/SignupRequest' } } },
      },
      responses: {
        '201': { description: 'Signup successful' },
        '400': {
          description: 'Invalid payload',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
          },
        },
        '404': {
          description: 'Organization not found',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
          },
        },
        '409': {
          description: 'Account with this email already exists',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
          },
        },
        '429': { description: 'Too many requests' },
      },
    },
  },
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Log in with email and password',
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
      },
      responses: {
        '200': {
          description: 'Login successful, returns access and refresh tokens',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } },
          },
        },
        '401': {
          description: 'Invalid credentials',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
          },
        },
        '429': { description: 'Too many requests' },
      },
    },
  },
  '/auth/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Log out and revoke a refresh token',
      requestBody: {
        required: false,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/LogoutRequest' } } },
      },
      responses: {
        '204': { description: 'Logout successful (always succeeds, even with no/invalid token)' },
      },
    },
  },
  '/auth/refresh-token': {
    post: {
      tags: ['Auth'],
      summary: 'Exchange a refresh token for a new access token',
      requestBody: {
        required: true,
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/RefreshTokenRequest' } },
        },
      },
      responses: {
        '200': {
          description: 'New access token issued',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/RefreshTokenResponse' } },
          },
        },
        '400': {
          description: 'Refresh token is required',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
          },
        },
        '401': {
          description: 'Invalid or expired refresh token',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
          },
        },
        '429': { description: 'Too many requests' },
      },
    },
  },
};
