pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'DefaultNodeJs') {
                    sh 'cd frontend && npm run install'
                }
            }
        }
    }
}
