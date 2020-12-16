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
        steps {
          nodejs('DefaultNodeJs') {
            sh '''
                    cd frontend
                    npm install
                    npm run build
                    cd ../backend
                    npm install
                    npm run import
                    '''
          }

        }
      }

      stage('Deploy') {
        steps {
          sh '''aws s3 cp frontend/dist s3://cranach-frontend --recursive
aws s3 cp backend/data s3://cranach-data --recursive --acl public-read
aws s3 website s3://cranach-frontend --index-document index.html --error-document error.html
'''
        }
      }

    }
  }