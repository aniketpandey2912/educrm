// OpenAPI fragment for apps/server/src/routes/super-admin.routes.ts. Only touch this file when those routes change.
export const paths = {
  '/super-admin/dashboard': {
    get: {
      tags: ['Super Admin'],
      summary: "Get the super admin's dashboard",
      description: 'Super admins bypass role checks and can access every per-role dashboard route.',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Dashboard data',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/DashboardResponse' } },
          },
        },
        '401': { description: 'Missing or invalid token' },
      },
    },
  },
};
