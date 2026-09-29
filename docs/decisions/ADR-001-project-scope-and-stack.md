# ADR-001: Project Scope and Technology Stack

**Status:** Accepted

## Context
This project's goal is to demonstrate self-healing behavior in a Kubernetes-based
distributed system, with measured recovery time as the core evidence. The risk
of over-scoping (too many services, too many technologies) is that the project
stalls before reaching the chaos-engineering and measurement phases, which are
the actual point.

## Decision
- Build exactly 3 microservices: api-gateway, user-service, order-service.
- Stack: Node.js + TypeScript, Docker, Kubernetes (Kind locally, EKS in production),
  Terraform for IaC, Prometheus + Grafana for observability, Chaos Mesh for
  failure injection, GitHub Actions for CI/CD, PostgreSQL as the data store.
- Explicitly excluded: service mesh (Istio/Linkerd), message queues (Kafka/RabbitMQ),
  multi-region/multi-cluster setups, canary/blue-green deployments, managed
  chaos-as-a-service tools, front-end UI.

## Alternatives Considered
- 4th microservice (inventory-service): rejected for v1 — adds repeated
  patterns without teaching anything new. Can be added later if more
  "distributed system" surface area is needed for interviews.
- Service mesh for traffic management: rejected — real production value, but
  adds a full extra operational layer orthogonal to proving self-healing.
  Noted as a "would add at scale" interview talking point instead.
- DynamoDB instead of PostgreSQL: rejected — relational failure modes
  (connection pool exhaustion during chaos experiments) are more instructive,
  and Postgres matches the existing stack.

## Consequences
- Faster to reach Phase 5-7 (the phases that actually demonstrate the
  project's thesis: failure injection + measured recovery).
- Smaller "impressive tech list" than a maximal version, but every
  technology present has a clear justification — better for interviews.
- If evaluators expect a 4th service, it can be added in ~30 minutes by
  copying the order-service pattern.
