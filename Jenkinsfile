pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        nodejs('DefaultNodeJs') {
          sh 'cd frontend && npm install'
        }

      }
    }

  }
}