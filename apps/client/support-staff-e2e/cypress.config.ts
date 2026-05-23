import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run support-staff:serve',
        production: 'npx nx run support-staff:serve-static',
      },
      ciWebServerCommand: 'npx nx run support-staff:serve-static',
      ciBaseUrl: 'http://localhost:4302',
    }),
    baseUrl: 'http://localhost:4302',
  },
});
