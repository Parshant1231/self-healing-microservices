# Screenshot Log

| # | File | What it shows | Proves |
|---|------|----------------|--------|
| 01 | screenshots/kubernetes/01-baseline-pods-running.png | 6 pods Running 1/1 | Healthy baseline state |
| 02 | screenshots/grafana/02-baseline-flat-replicas.png | Flat replica count pre-chaos | Baseline for contrast |
| 03 | screenshots/kubernetes/03-pod-failure-detection.png | kubectl watch showing dip+recovery | CLI-level detection/recovery evidence |
| 04 | screenshots/grafana/04-recovery-dip-and-recovery.png | Grafana panel dip-and-recovery shape | Visual, timestamped self-healing proof |
| 05 | screenshots/chaos/05-podchaos-status.png | PodChaos status/timestamps | Experiment ran as declared, auditable object |
