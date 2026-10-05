# Self-Healing Microservices with Chaos Engineering

## Project Overview
A 3-service Kubernetes-based microservices platform, deployed entirely
locally via Kind, engineered specifically to demonstrate and *measure*
automatic recovery from intentionally injected failures — using Chaos Mesh
for failure injection and Prometheus/Grafana for recovery-time evidence.

## Why This Project Exists
Most portfolio projects show "I can deploy something to Kubernetes." This
one shows reliability-engineering thinking: a written recovery objective,
controlled failure injection against it, and honest measured results —
including documenting what *couldn't* be tested and why (see Known
Limitations), rather than fabricating a clean story.

## Architecture
See [docs/architecture/architecture.md](docs/architecture/architecture.md).
3 services (api-gateway, user-service, order-service) behind Ingress,
Kubernetes handling reliability (probes, PDBs, HPA), Prometheus/Grafana for
observability, Chaos Mesh for failure injection, Jenkins for CI/CD.

## Technology Stack
Node.js/TypeScript · Docker · Kubernetes (Kind, local-only) · Jenkins ·
Prometheus · Grafana · Chaos Mesh · PostgreSQL-ready (not yet wired in)

## Key Features
- 3 independently deployable microservices with real inter-service HTTP
  communication and explicit failure handling (503, not a crash)
- Liveness/readiness probes, PodDisruptionBudgets, HPA on order-service
- Prometheus + Grafana dashboard visualizing replica availability during
  failures
- 3 executable Chaos Mesh experiments (pod-failure, network-delay,
  network-partition) with written hypotheses and results
- Jenkins pipeline: build -> load into cluster -> deploy -> health-gate

## How Self-Healing Works
See [docs/reliability/recovery-objective.md](docs/reliability/recovery-objective.md).
Kubernetes' ReplicaSet reconciliation loop, backed by readiness/liveness
probes, is the actual mechanism — not a script or cron job.

## Chaos Engineering Strategy
See [chaos/reports/](chaos/reports/) for individual experiment write-ups
with hypothesis, blast radius, and observed results.

## Observability
See [observability/](observability/). Grafana panel query:
`kube_deployment_status_replicas_available{namespace="self-healing"}`
visualizes the dip-and-recovery shape during any failure injection.

## Local Development
See [docs/prerequisites.md](docs/prerequisites.md) and
[docs/development-guide.md](docs/development-guide.md).

## Running It Yourself
    kind create cluster --name self-healing
    docker compose build
    kind load docker-image self-healing-microservices-api-gateway:latest --name self-healing
    kind load docker-image self-healing-microservices-user-service:latest --name self-healing
    kind load docker-image self-healing-microservices-order-service:latest --name self-healing
    kubectl apply -f k8s/namespace.yaml -f k8s/config/
    kubectl apply -f k8s/user-service/ -f k8s/order-service/ -f k8s/api-gateway/
Or trigger the Jenkins pipeline (see Jenkinsfile).

## Chaos Experiments & Results
See [chaos/reports/](chaos/reports/). Results reflect only experiments
actually executed; anything not run is explicitly marked NOT YET EXECUTED.

## Project Structure
    self-healing-microservices/
    ├── services/            # 3 microservices (Node.js/TS + Docker)
    ├── k8s/                 # Kubernetes manifests
    ├── chaos/               # Chaos Mesh experiments + reports
    ├── observability/       # Prometheus/Grafana config + dashboards
    ├── jenkins/              # Jenkins image + internal kubeconfig (gitignored)
    ├── Jenkinsfile
    ├── docs/                # architecture, ADRs, reliability, deployment
    └── docker-compose.yml

## Known Limitations
See [docs/known-limitations.md](docs/known-limitations.md).

## Future Improvements
See [docs/future-improvements.md](docs/future-improvements.md).

## Cost Considerations
None — this project runs entirely locally (Kind), by deliberate design
(see ADR-002). No AWS account or cloud spend required to reproduce it.

## Learning Outcomes
Kubernetes reconciliation loops and probe semantics; the practical
difference between voluntary and involuntary disruption (PDB scope);
declarative chaos experiments vs. ad-hoc failure injection; Jenkins
pipeline design around a local cluster's networking constraints.

## Interview Talking Points
See [docs/interview-prep.md](docs/interview-prep.md).

## License
MIT — see [LICENSE](LICENSE)
