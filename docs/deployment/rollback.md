# Rollback Strategy

## Automatic pipeline behavior
The Jenkins pipeline's Health Validation stage (`kubectl rollout status`)
fails the build if a new Deployment doesn't reach Ready within 90s. A failed
build does NOT automatically roll back the cluster — Kubernetes Deployments
already keep the previous ReplicaSet around, so rollback is a deliberate,
fast, manual step rather than a silent automatic one. We chose manual over
automatic rollback because auto-rollback on a flaky health check (e.g. a
slow image pull, not an actual bad deploy) could mask a real issue by
reverting before anyone investigates why the rollout was slow.

## Manual rollback (single command)
    kubectl rollout undo deployment/<service-name> -n self-healing

This reverts to the previous ReplicaSet's Pod template (previous image,
previous config) immediately.

## Verify a rollback worked
    kubectl rollout status deployment/<service-name> -n self-healing
    kubectl rollout history deployment/<service-name> -n self-healing

## When to roll back vs. redeploy forward
- Health Validation stage failed, cause unclear -> roll back immediately,
  investigate the failed build's logs separately.
- Cause is a known, quick code fix -> fix, commit, let the pipeline redeploy
  forward rather than rolling back then forward again.
