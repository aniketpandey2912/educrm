// Shared OpenAPI building blocks (info, tags, security, schemas reused by more than one module).
export const info = {
  title: 'EduCRM API',
  version: '1.0.0',
  description: 'REST API for the EduCRM multi-role education CRM platform.',
};

export const servers = [{ url: '/api' }];

export const tags = [
  { name: 'Health' },
  { name: 'Auth' },
  { name: 'Student' },
  { name: 'Admin' },
  { name: 'Support Staff' },
  { name: 'Super Admin' },
];

export const securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
};

export const schemas = {
  ErrorResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
  DashboardResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      user: {
        type: 'object',
        properties: {
          sub: { type: 'string' },
          role: { type: 'string' },
          org_id: { type: 'string', nullable: true },
        },
      },
    },
  },
};
