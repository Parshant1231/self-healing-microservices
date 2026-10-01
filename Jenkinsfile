pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Load Images into Kind') {
            steps {
                sh '''
                    kind load docker-image self-healing-microservices-api-gateway:latest --name self-healing
                    kind load docker-image self-healing-microservices-user-service:latest --name self-healing
                    kind load docker-image self-healing-microservices-order-service:latest --name self-healing
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f k8s/namespace.yaml
                    kubectl apply -f k8s/config/
                    kubectl apply -f k8s/user-service/
                    kubectl apply -f k8s/order-service/
                    kubectl apply -f k8s/api-gateway/
                '''
            }
        }

        stage('Health Validation') {
            steps {
                sh '''
                    kubectl rollout status deployment/user-service -n self-healing --timeout=90s
                    kubectl rollout status deployment/order-service -n self-healing --timeout=90s
                    kubectl rollout status deployment/api-gateway -n self-healing --timeout=90s
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded: all deployments rolled out and passed health checks.'
        }
        failure {
            echo 'Pipeline failed. See docs/deployment/rollback.md for manual rollback steps.'
        }
    }
}
