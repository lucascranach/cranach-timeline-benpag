pipeline {
    stages {
        stage('Checkout') {
            checkout([
                $class: 'GitSCM',
                branches: [[name: '*/feature/continuous-integration']],
                userRemoteConfigs: [[credentialsId: '1a756c73-8090-4f46-9881-1fa034de2f9a', url: 'https://github.com/BenPag/cranach.git']]
            ])
        }

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'DefaultNodeJs') {
                    sh """
                    cd frontend
                    npm install
                    npm run build
                    cd dist
                    zip -r ../../dist/frontend.zip *
                    cd ../../backend
                    npm install
                    npm run import
                    """
                }
            }
        }

        stage('Deploy') {
            sh 'echo "hello world"'
        }
    }
}
