import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    setupNodeEvents(on, config) {
      // Puedes agregar otros hooks aquí si lo necesitás
    }
  },

  // ✅ Configuramos mochawesome como el reporter
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/json',   // 🗂️ Carpeta donde se guardan los .json
    overwrite: false,
    html: false,
    json: true
  },

  video: true,
  screenshotOnRunFailure: true
})
