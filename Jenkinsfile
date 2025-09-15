/* groovylint-disable Indentation */
pipeline {
  agent any

  environment {
    CI = 'true'
    PATH = "/opt/homebrew/bin:$PATH"
  }

  stages {
    stage('Install dependencies') {
      steps {
        echo '📦 Installing dependencies...'
        sh 'npm ci'
      }
    }

    stage('Start local server') {
      steps {
        echo '🚀 Starting local server for fakeApp...'
        sh 'npx http-server ./cypress/fakeAppServer -p 8081 --cors -a 127.0.0.1 -c-1 &'
        sh 'sleep 10'
      }
    }

    stage('Run Cypress tests') {
      steps {
        echo '🧪 Running Cypress tests with Mochawesome reporter...'

        sh 'rm -rf cypress/reports/json/*.json cypress/reports/html'

        sh '''
          npx cypress run \
            --spec "cypress/e2e/fakeAppTest/**/*.cy.js" \
            --reporter mochawesome \
            --reporter-options reportDir=cypress/reports/json,overwrite=false,html=false,json=true
        '''
      }
    }

    stage('Generate HTML Report') {
      steps {
        echo '📄 Generating mochawesome HTML report...'

        script {
          def ts = new Date().format("yyyyMMdd-HHmmss")
          sh """
            npx mochawesome-merge cypress/reports/json/mochawesome*.json > cypress/reports/json/mochawesome-${ts}.json
            npx marge cypress/reports/json/mochawesome-${ts}.json \
              --reportDir cypress/reports/html \
              --reportFilename mochawesome-${ts}
          """
        }
      }
    }

    stage('Archive Test Artifacts') {
      steps {
        echo '📎 Archiving report artifacts...'
        archiveArtifacts artifacts: 'cypress/reports/html/*.html', fingerprint: true
        archiveArtifacts artifacts: 'cypress/reports/json/*.json', fingerprint: true
        archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
        archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
      }
    }
  }

  post {
    failure {
      echo '❌ Build failed. Please check the test reports.'
    }
    success {
      echo '✅ Build succeeded!'
    }
  }
}
