import { globby } from 'globby';

// Get the pattern from command-line arguments
const [,, patternFromCLI] = process.argv;

// Use default pattern if none is provided
const specPattern = patternFromCLI || 'cypress/e2e/**/*.cy.js';

const files = await globby(specPattern);

if (files.length === 0) {
  console.log(`⚠️  No spec files matched the pattern: "${specPattern}"`);
} else {
  console.log(`✅ Spec files that would be executed (pattern: "${specPattern}"):`);
  files.forEach(file => console.log(' -', file));
}

if (specPattern === '--help') {
  console.log(`
Usage:
  node list-specs.js [spec-pattern]

Examples:
  node list-specs.js
      → Lists all Cypress spec files (default: cypress/e2e/**/*.cy.js)

  node list-specs.js "cypress/e2e/apiPublic/*.cy.js"
      → Lists only the specs in the apiPublic folder

  node list-specs.js "cypress/e2e/**/*_err.cy.js"
      → Lists only spec files ending in _err.cy.js
  `);
  process.exit(0);
}
