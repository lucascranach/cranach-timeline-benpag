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
              sh 'aws s3 cp backend/data s3://cranach-data --recursive --acl public-read'
            }
          }

          stage('Deploy Frontend') {
            steps {
              sh 'aws s3 website s3://cranach-frontend --index-document index.html'
              sh 'aws s3 cp frontend/dist s3://cranach-frontend --recursive --acl public-read'
            }
          }

        }
      }

    }
  }
