# Interview Talking Points

## The one-sentence pitch
"I built a 3-service Kubernetes system, then deliberately broke it with
Chaos Mesh — killing pods, delaying and partitioning network traffic — and
measured whether Kubernetes and my application code actually recovered
within a defined objective, instead of just claiming it would."

## If asked "walk me through the project"
Problem -> Architecture (3 services, deliberately scoped small) ->
Reliability primitives (probes, PDBs, HPA) -> Observability (Prometheus/
Grafana, one key panel: replica availability over time) -> Chaos
experiments (pod-failure, network-delay, network-partition, node-failure
explicitly out of scope and why) -> Jenkins pipeline automating build/
deploy/health-check -> honest write-up of what worked and what didn't.

## Questions to prepare for beyond what's in each phase
- "What would you change if you did this again?" -> point to
  future-improvements.md, pick 1-2 genuinely, explain why.
- "What was the hardest part?" -> the Jenkins-to-Kind networking (internal
  vs external kubeconfig) is a real, specific, technical answer.
- "Why didn't you use EKS?" -> ADR-002's reasoning: proves the same
  self-healing concepts at zero cost; manifests are portable to EKS with
  only the Ingress/LoadBalancer layer changing.
