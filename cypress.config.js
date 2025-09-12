import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081', // ✅ Servimos desde la raíz del proyecto http://localhost:8080/perfil.html

    setupNodeEvents(on, config) {
      // You can customize event hooks here if needed
    },
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots'
  }
});
