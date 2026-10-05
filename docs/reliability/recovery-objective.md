# Recovery Objective

## Definition
For supported pod-level failures (a Pod is killed, crashes, or is manually
evicted), the platform should restore full Service availability — a new Pod
Running and Ready, receiving traffic — within **30 seconds**.

## Scope
Covers: single Pod deletion/crash, within a Deployment that has >=2 replicas
and a passing readiness probe.
Does NOT cover: node-level failure (addressed separately in Phase 6/7 chaos
experiments), or application-level bugs unrelated to Pod lifecycle.

## Why 30 seconds
Liveness probe: ~15s to detect + Pod scheduling/image start (fast, image
already loaded locally) + readiness probe passing (~2-7s) gives headroom
under 30s for the failure modes in scope, based on the probe timing
configured in Phase 4's deployment manifests.

## Measurement Method
1. Note timestamp when failure is injected (pod deleted).
2. Note timestamp when a replacement Pod reaches `Running` + `READY 1/1`.
3. Recovery time = (2) - (1).
Manual timestamps for now (Phase 4; Phase 5 automates this via Prometheus
metrics and a Grafana panel.

## Results
| Date | Method | Recovery Time | Result |
|------|--------|---------------|--------|
| 2026-10-05 | Chaos Mesh (pod-failure) | 29s | PASS |
