import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run student:serve',
        production: 'npx nx run student:serve-static',
      },
      ciWebServerCommand: 'npx nx run student:serve-static',
      ciBaseUrl: 'http://localhost:4300',
    }),
    baseUrl: 'http://localhost:4300',
  },
});
