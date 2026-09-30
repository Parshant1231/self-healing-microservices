# Grafana Dashboards

- Imported community dashboard ID 15761 (Kubernetes cluster overview)
- Custom "Self-Healing Recovery Dashboard" — panel query:
  `kube_deployment_status_replicas_available{namespace="self-healing"}`
  This panel visualizes pod recovery after chaos experiments (Phase 6/7):
  a dip to n-1 replicas followed by recovery to n is the visual proof of
  self-healing behavior.
