# Architecture

## High-Level Diagram

                         Client
                            |
                            v
                    Ingress-NGINX (Kind)
                            |
                            v
                      API Gateway (Node.js)
                            |
              +-------------+-------------+
              |                           |
              v                           v
        User Service (Node.js)     Order Service (Node.js)
              |                           |
              +-------------+-------------+
                            |
                            v
                    PostgreSQL (data store)

        --- Kubernetes layer (Kind cluster) ---
        Deployments, Services, HPA, PodDisruptionBudgets, Probes
                            |
              +-------------+-------------+
              |                           |
              v                           v
        Prometheus + Grafana        Chaos Mesh
        (metrics, dashboards,       (pod-kill, network-delay,
         recovery-time viz)          node-failure experiments)

        --- CI/CD layer ---
        Jenkins (containerized) -> build/test/push image -> kubectl apply

## Why local-only (Kind), not EKS
See ADR-002. Summary: proves the same self-healing/reliability concepts at
zero cost and faster iteration; the K8s manifests are portable to EKS or
self-managed EC2 nodes later with no application-level changes.

## Why Jenkins, not GitHub Actions
See ADR-002. Jenkins is still the most commonly required CI/CD tool in
DevOps job postings and demonstrates self-hosted pipeline management
(agents, plugins, Jenkinsfile-as-code) rather than a fully managed SaaS runner.

## Why 3 services
api-gateway fronts requests and routes them; user-service and order-service
give real inter-service communication (order-service calls user-service to
validate a user) enough to demonstrate retries, timeouts, and failure
propagation without unnecessary repetition. See ADR-001.

## Why this layering
- Kubernetes layer: owns reliability primitives (probes, PDBs, HPA) — this is
  where "self-healing" actually lives.
- Observability layer: exists to make recovery provable, not just claimed.
- Chaos layer: exists to trigger the failures we then measure recovery from.
- CI/CD layer: automates build -> test -> deploy so recovery experiments run
  against a repeatably-deployed system, not a hand-tweaked one.
