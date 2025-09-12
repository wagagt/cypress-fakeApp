pipeline {
  agent any  // This tells Jenkins to run the pipeline on any available agent (machine)

  environment {
    CI = 'true'  // Enables Cypress to run in Continuous Integration mode
    PATH = "/opt/homebrew/bin:$PATH"
  }

  stages {
    stage('Install dependencies') {
      steps {
        // Install dependencies defined in package-lock.json
        sh 'npm ci'
      }
    }

    stage('Start local server') {
      steps {
        // Start a local HTTP server to serve the fake HTML app
        // & runs it in the background
        sh 'npx http-server ./cypress/fakeAppServer -p 8080 &'

        // Wait 5 seconds to ensure the server is ready before running tests
        sh 'sleep 5'
      }
    }

    stage('Run Cypress tests') {
      steps {
        // Run only the Cypress tests inside the fakeAppTest group
        sh 'npx cypress run --spec "cypress/e2e/fakeAppTest/**/*.cy.js"'
      }
    }
  }

  post {
    always {
      // After the tests run (whether they pass or fail), archive test results

      // Save Cypress videos (for debugging failures)
      archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true

      // Save Cypress screenshots (taken on test failures)
      archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
    }
  }
}
