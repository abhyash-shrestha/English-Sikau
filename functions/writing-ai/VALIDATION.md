# Writing AI pilot validation — 21 October 2026

**Status: prepared; not deployed or enabled.** No Groq key has been created/read, no paid service enabled, and no active Function configuration, student account, membership, trial date or progress record changed. A separate empty AI-quota table was created as preparation.

## Verified connections and rollback point

- GitHub `abhyash-shrestha/English-Sikau` is accessible with write permission. Baseline main commit: `87ed33fbe645226c4cf038b5d425e358af3f12fc` (merged PR #38).
- Appwrite console is signed in; organization/project is on Free, Frankfurt, project `6ac9b80d0009575e5d4d`.
- Free Functions capacity is **2/2**; Create Function is disabled. Existing Trial Pass and Trial Manager must remain available.
- Downloaded the active Trial Manager source, deployment `6ace11cdafb2432f9aec`, for inspection and rollback. The proposed package preserves its original `src/main.js`, request parser, trial policy, package and lockfile byte for byte. It adds a separate entrypoint and writing modules. Nothing has been uploaded or activated.
- Groq sign-in is now verified. Billing shows **Free / $0 / Current Plan**. The actual organization limits for `openai/gpt-oss-20b` are 30 RPM, 1,000 RPD, 8,000 TPM and 200,000 TPD. Inference APIs ZDR now displays **Enabled**; global ZDR is disabled. An attempted automated ZDR confirmation was rejected by automatic approval review; a later read showed the enabled setting, and no confirmation retry was attempted. This records the observed state without attributing the change to that rejected action.
- Groq key inventory shows **(No keys)**. A key form named `English Sikau Writing AI` is prepared but no key has been generated. Cloudflare's visible **Verify you are human** check blocks completion; it has not been attempted by the agent.
- Existing Trial Manager runtime: Node.js 22, entrypoint `src/main.js`, 15-second timeout, execution logging enabled, no schedule/events, zero dynamic-key scopes. Shared quotas now reuse the legacy server-only row credential, avoiding scope expansion. Deployment must explicitly review the proposed 35-second timeout and disabled execution logging along with the new entrypoint.

- Prepared dedicated AI-quota table: database `6acaf17b000448d3d30f`, table `6ad8d2a400056e7b17f5`, name `Writing AI Quotas (server only)`. Table permissions are empty and row-level security stays disabled, denying client access without granting row exceptions. The required `count` integer column is bounded 0–16. Existing trial/progress tables were not edited.

## Tests actually run

| Test group | Result | Limits |
| --- | --- | --- |
| Writing backend, quotas, SDK client, dashboard and existing browser security | 67 passed, 0 failed | Model, account and database responses are simulated. This validates behavior/security contracts, not actual grammar quality or production permissions. |
| Live pinned SDK integrity | Both actual Appwrite 17 CDN files match the configured SHA-384 digest | Does not test student sign-in. |
| Current production Trial Manager source through the shared adapter | 15 passed, 0 failed | Isolated regression suite with simulated account/table services; no production data touched. |
| Syntax, whitespace and credential-pattern scans | Passed | Pattern scanning is not a complete secret audit. |
| Real Groq correction/scoring | Not run | Groq sign-in and key are missing. No reported grammar phrase is claimed to have passed a real model test. |
| Real phone/tablet/desktop rendering and dark-mode contrast | Pending | DOM behavior is tested; cloud browser rejected a local-file preview URL. Staging/live visual checks remain necessary. |
| Live anonymous read of the new quota table | HTTP 401, denied | No credentials sent and no rows written. |
| Live authorized account and expired trial | Pending | Automated equivalent cases passed; no live student execution was attempted. |

Coverage includes paid/active trial, anonymous/forged/disabled/unverified/ineligible accounts, expired/stale/future trials, expiry during quota reservation, malformed/oversized inputs, obvious contact data, absent configuration, storage failure, provider HTTP errors, bad/truncated/refused JSON, scoring caps, invalid feedback, exact Appwrite SDK 17 arguments, stale results, consent, basic fallback, caching, Copy and text-only output. Sixty concurrent quota requests admit one provider slot; user/shared caps and the minute-boundary cooldown pass.

## Material fixes

PR #38 called the pinned positional Appwrite SDK using an object argument. The corrected call was tested against the actual published SDK 17 package. AI now runs before and independently of the rule-based checker. No pending or failed request displays an invented AI score. Only the explicit basic fallback invokes the legacy checker. Correction, three bilingual fixes and the clearly fictional model answer are separate.

Quota and error safeguards are implemented but use the newly prepared server-only Appwrite quota table, with a live authenticated server-write check still required before deployment. The shared implementation reuses the existing server credential instead of adding dynamic-key scopes. AI additionally requires server-managed `sikauaiapproved` pilot enrollment; this does not grant or modify membership. Children/unknown-age accounts must not be enrolled before the privacy process is reviewed.

## Remaining launch gates

1. Groq sign-in, Free plan/limits and displayed inference ZDR are verified. User must complete the visible human-verification challenge. Create an approved key and securely place it only in Appwrite; no key has been generated or stored yet.
2. Obtain approval for changing the production Trial Manager entrypoint to share its existing free Function slot. Preserve its original deployment/settings and retain authenticated execution. Use only the dedicated quota table and existing server credential; do not add dynamic-key scopes.
3. Deploy without enabling the public frontend flag; test real authorization, counter permissions, failures, quotas and `test/grammar-cases.json`, including long/unseen writing and all previously reported failures.
4. Finish real responsive/dark visual QA and an authorized live account check, then publish the verified frontend flag. Keep minors outside the pilot until required notices, consent and retention practices are approved.

Rollback: disable `WRITING_AI_ENABLED`, restore `writingAI:null`, and if needed reactivate Trial Manager deployment `6ace11cdafb2432f9aec` with `src/main.js`. Frontend rollback should be a revert commit, preserving history. Never reset trial rows or memberships.
