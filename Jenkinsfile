pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        sh 'ls'
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
              sh 'cd backend && npm install && npm run import'
            }

          }
        }

      }
    }

    stage('Deploy') {
      parallel {
        stage('Deploy Data') {
          steps {
            sh 'sh deploy-data.sh'
          }
        }

        stage('Deploy Frontend') {
          steps {
            sh 'sh deploy-frontend.sh'
          }
        }

      }
    }

  }
}