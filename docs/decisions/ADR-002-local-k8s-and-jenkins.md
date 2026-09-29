# ADR-002: Local-Only Kubernetes (No AWS/EKS) and Jenkins for CI/CD

**Status:** Accepted
**Supersedes:** the AWS/EKS and GitHub Actions portions of ADR-001

## Context
ADR-001 planned a Kind-for-local, EKS-for-production deployment target and
GitHub Actions for CI/CD. After Phase 1, the decision was revisited: the
project's actual thesis (failure injection + measured recovery) does not
require a cloud-hosted cluster, and Jenkins better demonstrates self-hosted
CI/CD pipeline skills, which show up more frequently in target job postings.

## Decision
- Run the cluster locally only, via Kind (Kubernetes-in-Docker). No AWS
  account, no Terraform, no EKS/EC2/VPC provisioning anywhere in this project.
- Use Jenkins (running as a container, or later as an in-cluster pod) instead
  of GitHub Actions for the CI/CD pipeline in Phase 7.
- Replace AWS ALB in the architecture diagram with Ingress-NGINX inside Kind.

## Alternatives Considered
- **k3s or kubeadm on EC2:** rejected — reintroduces AWS cost/complexity the
  project doesn't need to prove its thesis. Noted as a valid future extension.
- **Keep GitHub Actions:** rejected — Jenkins is more commonly required in
  target job postings (per active applications) and demonstrates self-hosted
  pipeline/agent management, a skill GitHub Actions doesn't exercise.

## Consequences
- Zero infrastructure cost for the entire project.
- Terraform is dropped from the stack entirely — if IaC experience needs
  demonstrating separately, that becomes a distinct future project.
- The original Phase 4 (AWS EKS + Terraform) is removed; phases 4-8 are
  renumbered (see updated phase plan in README/context summary).
- Manifests remain portable: moving to EKS/EC2 later only changes the
  Ingress/LoadBalancer layer and node provisioning, not the app or K8s specs.
