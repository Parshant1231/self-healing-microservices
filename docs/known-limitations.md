# Known Limitations

- **No node-failure testing.** Single-node Kind cluster can't meaningfully
  simulate losing one node while others keep serving traffic (see
  chaos/reports/experiment-04-node-failure.md).
- **No persistent data store.** Services use in-memory data; a Pod restart
  loses its state. Acceptable for this project's focus (pod-level
  self-healing, not data durability), but means DB-related failure modes
  (connection pool exhaustion, migration locks) aren't exercised.
- **No automated test suite.** Verification throughout was manual
  (curl, kubectl, Grafana inspection) — a deliberate scope decision (see
  ADR-001), not an oversight.
- **Grafana/Chaos Mesh dashboard access uses static local credentials/no
  auth**, acceptable only because this never leaves localhost.
- **Docker socket mounted into Jenkins** — root-equivalent host access;
  a deliberate simplification for a local single-user setup, not a
  production-appropriate pattern (see Phase 7 security note).
