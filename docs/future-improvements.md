# Future Improvements

- Add a real PostgreSQL StatefulSet and rework readiness probes to check
  DB connectivity, not just process liveness.
- Multi-node Kind config (or migrate to EC2/EKS) specifically to enable a
  real node-failure chaos experiment.
- Add `prom-client` metrics endpoints to each service for request-rate/
  error-rate/latency panels, beyond the current pod-level metrics.
- Replace Docker-socket-mounted Jenkins builds with Kaniko or BuildKit
  rootless builds to remove the root-equivalent access tradeoff.
- Add a manual approval gate before deploy if this were ever pointed at a
  real shared environment instead of a local cluster.
