pipeline {
  agent any
    agent any

  environment {
    CI = 'true'
    PATH = "/opt/homebrew/bin:$PATH"
    BUILD_TS = "${new Date().format('yyyyMMdd-HHmmss')}"  
  }

  stages {
    stage('Install dependencies') {
      steps {
        echo '📦 Installing dependencies...'
        sh 'npm ci'
      }
    environment {
        CI = 'true'
        PATH = "/opt/homebrew/bin:$PATH"
        BUILD_TS = "${new Date().format('yyyyMMdd-HHmmss')}"
    }

    stage('Start local server') {
      steps {
        echo '🚀 Starting local server for fakeApp...'
        sh 'npx http-server ./cypress/fakeAppServer -p 8081 --cors -a 127.0.0.1 -c-1 &'
        sh 'sleep 10'
      }
    }
    stages {
        stage('Install dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm ci'
            }
        }

    stage('Run Cypress tests') {
      steps {
        echo '🧪 Running Cypress tests with Mochawesome reporter...'
        stage('Start local server') {
            steps {
                echo '🚀 Starting local server for fakeApp...'
                sh 'npx http-server ./cypress/fakeAppServer -p 8081 --cors -a 127.0.0.1 -c-1 &'
                sh 'sleep 10'
            }
        }

        // Limpia reportes anteriores
        sh 'rm -rf cypress/reports/json/*.json cypress/reports/html'
        stage('Run Cypress tests') {
            steps {
                echo '🧪 Running Cypress tests with Mochawesome reporter...'

        // Ejecuta Cypress con reporter mochawesome
        sh '''
          npx cypress run \\
            --spec "cypress/e2e/fakeAppTest/**/*.cy.js" \\
            --reporter mochawesome \\
            --reporter-options reportDir=cypress/reports/json,overwrite=false,html=false,json=true
        '''
      }
    }
                // Limpia reportes anteriores
                sh 'rm -rf cypress/reports/json/*.json cypress/reports/html'

    stage('Generate HTML Report') {
      steps {
        echo '📄 Generating mochawesome HTML report...'
                // Ejecuta Cypress con reporter mochawesome
                sh '''
                  npx cypress run \\
                    --spec "cypress/e2e/fakeAppTest/**/*.cy.js" \\
                    --reporter mochawesome \\
                    --reporter-options reportDir=cypress/reports/json,overwrite=false,html=false,json=true
                '''
            }
        }

        sh '''
          npx mochawesome-merge cypress/reports/json/mochawesome_*.json > cypress/reports/json/mochawesome-${BUILD_TS}.json
          npx marge cypress/reports/json/mochawesome-${BUILD_TS}.json --reportDir cypress/reports/html --reportFilename mochawesome-${BUILD_TS}
        '''
      }
    }
        stage('Generate HTML Report') {
            steps {
                echo '📄 Generating mochawesome HTML report...'

    stage('Archive Test Artifacts') {
      steps {
        echo '📎 Archiving report artifacts...'
        archiveArtifacts artifacts: 'cypress/reports/html/*.html', fingerprint: true
        archiveArtifacts artifacts: 'cypress/reports/json/*.json', fingerprint: true
        archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
        archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
      }
                sh '''
                  npx mochawesome-merge cypress/reports/json/mochawesome_*.json > cypress/reports/json/mochawesome-${BUILD_TS}.json
                  npx marge cypress/reports/json/mochawesome-${BUILD_TS}.json --reportDir cypress/reports/html --reportFilename mochawesome-${BUILD_TS}
                '''
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
  }

  post {
    failure {
      echo '❌ Build failed. Please check the test reports.'
    post {
        failure {
            echo '❌ Build failed. Please check the test reports.'
        }
        success {
            echo '✅ Build succeeded!'
        }
    }
    success {
      echo '✅ Build succeeded!'
    }
  }
}
