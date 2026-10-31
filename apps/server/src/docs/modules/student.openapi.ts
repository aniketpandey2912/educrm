// OpenAPI fragment for apps/server/src/routes/student.routes.ts. Only touch this file when those routes change.
export const paths = {
  '/student/dashboard': {
    get: {
      tags: ['Student'],
      summary: "Get the student's dashboard",
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
