pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout([
                                                                                          $class: 'GitSCM',
                                                                                          branches: [[name: '*/feature/continuous-integration']],
                                                                                          userRemoteConfigs: [[credentialsId: '1a756c73-8090-4f46-9881-1fa034de2f9a', url: 'https://github.com/BenPag/cranach.git']]
                                                                                      ])
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