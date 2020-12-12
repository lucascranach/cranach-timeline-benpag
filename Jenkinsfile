pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Frontend') {
          steps {
            nodejs('DefaultNodeJs') {
              sh '''cd frontend && npm install
npm run build
ls /dist'''
            }

          }
        }

        stage('Backend') {
          steps {
            nodejs('DefaultNodeJs') {
              sh '''cd backend && npm install
'''
            }

          }
        }

      }
    }

  }
}