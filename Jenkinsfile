// Powered by Infostretch

timestamps {

node () {

	stage ('cranach_plain - Checkout') {
 	 checkout([$class: 'GitSCM', branches: [[name: '*/feature/continuous-integration']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '1a756c73-8090-4f46-9881-1fa034de2f9a', url: 'https://github.com/BenPag/cranach.git']]])
	}
	stage ('cranach_plain - Build') {

// Unable to convert a build step referring to "jenkins.plugins.nodejs.NodeJSBuildWrapper". Please verify and convert manually if required.
// Unable to convert a build step referring to "hudson.plugins.timestamper.TimestamperBuildWrapper". Please verify and convert manually if required.		// Shell build step
sh """
cd frontend
npm install
#npm run build
cd ..
cd backend
npm install
apt install zip
zip -r * lambda.zip
 """
// Unable to convert a build step referring to "com.xti.jenkins.plugin.awslambda.upload.LambdaUploadBuildStep". Please verify and convert manually if required.
	}
}
}
