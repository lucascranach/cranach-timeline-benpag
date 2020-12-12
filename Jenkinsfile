pipeline {
  agent {
    node {
      label 'NPM'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'cd frontend && npm install && npm run build'
      }
    }

  }
}