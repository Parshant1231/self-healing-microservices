# Live Demo Script (5-10 min)

1. **Architecture (30s)** — show docs/architecture/architecture.md diagram.
2. **Running application (30s)** —
       curl http://localhost:4000/health
       curl http://localhost:4000/users
   via the port-forwarded gateway.
3. **Kubernetes pods (30s)** —
       kubectl get pods -n self-healing
   Point out 2 replicas per service.
4. **Grafana dashboard (1 min)** — open localhost:3000, show the Replica
   Availability panel, currently flat.
5. **Inject failure (30s)** —
       kubectl apply -f chaos/experiments/pod-failure.yaml
6. **Observe failure (1 min)** — split attention between:
       kubectl get pods -n self-healing -l app=order-service --watch
   and the Grafana panel dipping.
7. **Recovery (1 min)** — pod returns to Ready without being
   deleted/recreated (this is pod-failure's specific mechanism, worth
   pointing out vs. a full pod deletion).
8. **Show measured recovery time** — point to the specific number from
   chaos/reports/experiment-01-pod-failure.md, say it out loud.
9. **Jenkins pipeline (1-2 min)** — show a green pipeline run, name each
   stage's purpose in one sentence.
10. **Close** — one sentence: "This is portable to a real cluster with only
    the Ingress/LoadBalancer layer changing — everything else, including
    the chaos experiments, ports as-is."
