# Architecture

## High-Level Diagram

                         Internet
                            |
                            v
                 AWS ALB (via Ingress/K8s Service)
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

        --- Kubernetes / EKS layer ---
        Deployments, Services, HPA, PodDisruptionBudgets, Probes
                            |
              +-------------+-------------+
              |                           |
              v                           v
        Prometheus + Grafana        Chaos Mesh
        (metrics, dashboards,       (pod-kill, network-delay,
         recovery-time viz)          node-failure experiments)

## Why 3 services
api-gateway fronts requests and routes them; user-service and order-service
give real inter-service communication (order-service calls user-service to
validate a user) enough to demonstrate retries, timeouts, and failure
propagation without unnecessary repetition. See ADR-001 for full reasoning.

## Why this layering
- Kubernetes layer: owns reliability primitives (probes, PDBs, HPA) — this is
  where "self-healing" actually lives.
- Observability layer: exists to make recovery provable, not just claimed.
- Chaos layer: exists to trigger the failures we then measure recovery from.

## Evolution across phases
This diagram gains detail in Phase 4 (VPC/subnets/EKS specifics) and Phase 6
(metrics pipeline detail). This is the conceptual v1.
