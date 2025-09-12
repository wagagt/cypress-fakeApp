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

        // Limpia reportes anteriores
        sh 'rm -rf cypress/reports/json/*.json cypress/reports/html'

        // Ejecuta Cypress con reporter mochawesome
        sh 'npx cypress run --spec "cypress/e2e/fakeAppTest/**/*.cy.js" --reporter mochawesome --reporter-options reportDir=cypress/reports/json,overwrite=false,html=false,json=true'
      }
    }

    stage('Generate HTML Report') {
      steps {
        echo '📄 Generating mochawesome HTML report...'

        sh '''
          npx mochawesome-merge cypress/reports/json/mochawesome_*.json > cypress/reports/json/mochawesome.json
          npx marge cypress/reports/json/mochawesome.json --reportDir cypress/reports/html
        '''
      }
    }

    stage('Archive Test Artifacts') {
      steps {
        echo '📎 Archiving videos, screenshots, and HTML report...'

        archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
        archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
        archiveArtifacts artifacts: 'cypress/reports/html/*.html', allowEmptyArchive: true
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
