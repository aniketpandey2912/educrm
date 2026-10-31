// OpenAPI fragment for apps/server/src/routes/support-staff.routes.ts. Only touch this file when those routes change.
export const paths = {
  '/support-staff/dashboard': {
    get: {
      tags: ['Support Staff'],
      summary: 'Get the support staff dashboard',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Dashboard data',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/DashboardResponse' } },
          },
        },
        '401': { description: 'Missing or invalid token' },
        '403': { description: 'Insufficient role' },
      },
    },
  },
};
