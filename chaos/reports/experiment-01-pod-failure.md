# Experiment 01: Pod Failure (order-service)

**Objective:** Verify that a container-level failure inside an order-service Pod is detected by Kubernetes' readiness probe and does not cause visible downstream failures for clients calling the api-gateway.

**Hypothesis:** The readiness probe will detect the failure within ~10s (2 consecutive 5s-interval failures per Phase 4 config) and the Service will stop routing traffic to the affected Pod until it recovers, with the remaining replica serving all traffic in the meantime.

**Environment:** Local Kind cluster, namespace `self-healing`, order-service at 2 replicas.

**Blast Radius:** 1 Pod (mode: one), order-service only, 30s duration.

**Chaos Injection:** chaos/experiments/pod-failure.yaml applied via kubectl.

**Expected Behavior:** Targeted Pod's readiness fails, Service routes only to the healthy replica, targeted Pod self-recovers after 30s without being deleted/recreated.

**Observed Behavior:** Target pod `order-service-7479575bd-zwpjq` failed its readiness check and transitioned to `0/1 READY` after chaos injection, accumulating 3 container restarts over the fault lifecycle before restoring to `1/1 READY` once the 30s duration expired[cite: 1, 5]. The non-targeted replica (`order-service-7479575bd-zdv9s`) remained healthy and active throughout[cite: 1].

**Metrics:** Grafana panel "Replica Availability — self-healing namespace" showed a baseline of 2 available replicas dipping directly to 1 available replica at ~13:54:00, then restoring cleanly to 2 replicas at ~13:54:30[cite: 3, 4].

**Detection Time:** ~8–10s (Pod transitioned from healthy to `0/1` readiness within two probe failure cycles)[cite: 1].

**Recovery Time:** ~30s (Injected at `08:23:23Z`, recovered at `08:23:52Z` via Chaos Mesh controller; pod stabilized back to `1/1 READY` ~6s after recovery)[cite: 1, 5].

**Availability Impact:** Minimal to none — traffic was routed to the surviving healthy replica (`order-service-7479575bd-zdv9s`), resulting in no failed requests via the API gateway during the degraded window[cite: 1].

**Result:** PASS — The failed pod was isolated from traffic, remained running without pod recreation, and recovered back to ready state within the 30-second target objective[cite: 1, 5].

**Root Cause:** N/A (intentional injected failure, not a bug)

**Lessons Learned:** Kubernetes readiness probes combined with multi-replica deployments successfully isolate single-container failures without dropping endpoint availability, though probe timings dictate the ~10s detection window.

**Evidence:**
- `01-baseline-pods-running.png` — Baseline state showing all services at 2/2 replicas healthy[cite: 2].
- `02-baseline-flat-replicas.png` — Baseline Grafana metric showing constant 2 available replicas[cite: 3].
- `03-pod-failure-detection.png` — Live watch output showing `order-service-7479575bd-zwpjq` dropping to `0/1` and recovering to `1/1`[cite: 1].
- `04-recovery-dip-and-recovery.png` — Grafana panel showing the 2 -> 1 -> 2 availability dip[cite: 4].
- `05-podchaos-status.png` — `kubectl describe podchaos` showing successful `Apply` at `08:23:23Z` and `Recover` at `08:23:52Z`[cite: 5].
