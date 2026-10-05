# Evidence Collection Runbook

Run this whenever you need fresh screenshots/results (after any pause/resume,
or to re-verify after a change). Three terminals needed throughout.

## Terminal setup
- Terminal 1: `kubectl port-forward -n observability svc/kube-prometheus-grafana 3000:80`
- Terminal 2: `kubectl port-forward -n self-healing svc/api-gateway 4000:4000`
- Terminal 3: free, for commands below

## Screenshot checklist (capture in this order)
See docs/evidence/screenshot-log.md for the numbered list with filenames.
