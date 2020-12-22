pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            nodejs('DefaultNodeJs') {
              sh 'cd frontend && npm install && npm run build'
            }

          }
        }

        stage('Import') {
          steps {
            nodejs('DefaultNodeJs') {
              sh 'bash deployment/import-data.sh'
            }

          }
        }

      }
    }

    stage('Deploy') {
      parallel {
        stage('Deploy Data') {
          steps {
            sh 'bash deployment/deploy-data.sh'
          }
        }

        stage('Deploy Frontend') {
          steps {
            sh 'bash deployment/deploy-frontend.sh'
          }
        }

      }
    }

  }
}