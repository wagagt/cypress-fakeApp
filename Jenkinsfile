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
        // ✅ Start a local HTTP server to serve the fake HTML app
        // - Uses port 8081 to avoid conflict with Jenkins (which uses 8080)    
        // - Enables CORS and disables caching
        // - Runs in the background with '&'
        sh 'npx http-server ./cypress/fakeAppServer -p 8081 --cors -a 127.0.0.1 -c-1 &'

        // ⏳ Wait to ensure the server is fully ready before tests start
        sh 'sleep 10'
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
