FROM jenkins/jenkins:lts-jdk17
USER root

# Docker CLI (talks to the host's Docker daemon via the mounted socket)
RUN apt-get update && apt-get install -y ca-certificates curl gnupg lsb-release && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce-cli docker-compose-plugin && \
    rm -rf /var/lib/apt/lists/*

# kubectl
RUN curl -Lo /usr/local/bin/kubectl "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x /usr/local/bin/kubectl

# kind CLI (needed for `kind load docker-image` inside the pipeline)
RUN curl -Lo /usr/local/bin/kind https://kind.sigs.k8s.io/dl/v0.32.0/kind-linux-amd64 \
    && chmod +x /usr/local/bin/kind

# Let the jenkins user run docker commands
RUN groupadd -f docker && usermod -aG docker jenkins

USER jenkins
