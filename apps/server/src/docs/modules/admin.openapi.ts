// OpenAPI fragment for apps/server/src/routes/admin.routes.ts. Only touch this file when those routes change.
export const paths = {
  '/admin/dashboard': {
    get: {
      tags: ['Admin'],
      summary: "Get the admin's dashboard",
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
