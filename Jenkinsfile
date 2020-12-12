pipeline {
  agent any
  stages {
    stage('npm install') {
      parallel {
        stage('Frontend') {
          steps {
            nodejs('DefaultNodeJs') {
              sh '''cd frontend && npm install
echo \'frontend npm install finished\''''
            }

          }
        }

        stage('Backend') {
          steps {
            nodejs('DefaultNodeJs') {
              sh '''cd backend && npm install
echo \'backend npm install finished\''''
            }

          }
        }

      }
    }

  }
}