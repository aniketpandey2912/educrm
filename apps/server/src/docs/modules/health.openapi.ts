// OpenAPI fragment for the health check route. Only touch this file when that route changes.
export const paths = {
  '/health': {
    get: {
      tags: ['Health'],
      summary: 'Health check',
      responses: {
        '200': {
          description: 'Service is healthy',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { status: { type: 'string' } } },
            },
          },
        },
      },
    },
  },
};
