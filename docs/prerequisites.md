# Prerequisites

## Required for local development (Phase 2-3)
- Node.js (LTS) + npm
- Docker Desktop (or Docker Engine + Docker Compose)
- kubectl
- Kind (Kubernetes in Docker) — for local cluster testing

## Required later (Phase 4+)
- Terraform CLI
- AWS CLI, configured with an IAM user/role that has EKS/VPC/EC2 permissions
- An AWS account (Phase 4 introduces real, small costs)

## Required later (Phase 6-7)
- helm (used to install Prometheus, Grafana, Chaos Mesh into the cluster)

## Verify installs
    node -v
    docker -v
    kubectl version --client
    kind version
