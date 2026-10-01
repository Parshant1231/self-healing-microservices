# Experiment 04: Node Failure

**Status: NOT APPLICABLE IN THIS ENVIRONMENT**

## Reasoning
This project runs on a single-node Kind cluster (Kubernetes-in-Docker) by
design (ADR-002 — local-only, no cloud). A "node failure" experiment on a
1-node cluster is indistinguishable from destroying the entire cluster —
it would not exercise the real failure mode being tested (some nodes fail
while the control plane and other nodes continue scheduling replacement
Pods elsewhere).

## What real node-failure testing requires
A multi-node cluster (a multi-node Kind config, or actual multiple EC2/VM
nodes) so that Pods from a failed node can be observed rescheduling onto a
surviving node. This is an explicitly identified extension for the
project's "Future Improvements" section, not a gap that was ignored.

## Distinction from what WAS tested
- Pod failure (Experiment 01): container inside a Pod fails; Pod survives.
- Network delay/partition (Experiments 02-03): Pods are healthy, but
  connectivity between them degrades or breaks.
- Node failure: an entire machine and everything scheduled on it disappears
  at once — a different blast radius than any experiment above, requiring
  multi-node infrastructure to test honestly.
