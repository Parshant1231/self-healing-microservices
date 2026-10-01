# Experiment 01: Pod Failure (order-service)

**Objective:** Verify that a container-level failure inside an order-service
Pod is detected by Kubernetes' readiness probe and does not cause visible
downstream failures for clients calling the api-gateway.

**Hypothesis:** The readiness probe will detect the failure within ~10s
(2 consecutive 5s-interval failures per Phase 4 config) and the Service will
stop routing traffic to the affected Pod until it recovers, with the
remaining replica serving all traffic in the meantime.

**Environment:** Local Kind cluster, namespace `self-healing`,
order-service at 2 replicas.

**Blast Radius:** 1 Pod (mode: one), order-service only, 30s duration.

**Chaos Injection:** chaos/experiments/pod-failure.yaml applied via kubectl.

**Expected Behavior:** Targeted Pod's readiness fails, Service routes only
to the healthy replica, targeted Pod self-recovers after 30s without being
deleted/recreated.

**Observed Behavior:** NOT YET EXECUTED — fill in after running Step 3.

**Metrics:** NOT YET EXECUTED — capture from Grafana's
"Replica Availability" panel (Phase 5) during this window.

**Detection Time:** NOT YET EXECUTED

**Recovery Time:** NOT YET EXECUTED

**Availability Impact:** NOT YET EXECUTED — did any curl request to
api-gateway during the 30s window fail or succeed?

**Result:** NOT YET EXECUTED

**Root Cause:** N/A (intentional injected failure, not a bug)

**Lessons Learned:** NOT YET EXECUTED

**Evidence:** NOT YET EXECUTED — attach Grafana screenshot showing the
replica dip, and `kubectl describe podchaos` output.
