# Writing AI pilot validation — 21 October 2026

**Status: prepared; not deployed or enabled.** No Groq key has been created/read, no paid service enabled, and no production configuration, student account, membership, trial date or progress record changed.

## Verified connections and rollback point

- GitHub `abhyash-shrestha/English-Sikau` is accessible with write permission. Baseline main commit: `87ed33fbe645226c4cf038b5d425e358af3f12fc` (merged PR #38).
- Appwrite console is signed in; organization/project is on Free, Frankfurt, project `6ac9b80d0009575e5d4d`.
- Free Functions capacity is **2/2**; Create Function is disabled. Existing Trial Pass and Trial Manager must remain available.
- Downloaded the active Trial Manager source, deployment `6ace11cdafb2432f9aec`, for inspection and rollback. The proposed package preserves its original `src/main.js`, request parser, trial policy, package and lockfile byte for byte. It adds a separate entrypoint and writing modules. Nothing has been uploaded or activated.
- Groq console shows its sign-in screen. Actual organization plan, key, Data Controls and usage are not verified.

## Tests actually run

| Test group | Result | Limits |
| --- | --- | --- |
| Writing backend, quotas, SDK client, dashboard and existing browser security | 66 passed, 0 failed | Model, account and database responses are simulated. This validates behavior/security contracts, not actual grammar quality or production permissions. |
| Live pinned SDK integrity | Both actual Appwrite 17 CDN files match the configured SHA-384 digest | Does not test student sign-in. |
| Current production Trial Manager source through the shared adapter | 15 passed, 0 failed | Isolated regression suite with simulated account/table services; no production data touched. |
| Syntax, whitespace and credential-pattern scans | Passed | Pattern scanning is not a complete secret audit. |
| Real Groq correction/scoring | Not run | Groq sign-in and key are missing. No reported grammar phrase is claimed to have passed a real model test. |
| Real phone/tablet/desktop rendering and dark-mode contrast | Pending | DOM behavior is tested; cloud browser rejected a local-file preview URL. Staging/live visual checks remain necessary. |
| Live authorized account and expired trial | Pending | Automated equivalent cases passed; no live student execution was attempted. |

Coverage includes paid/active trial, anonymous/forged/disabled/unverified/ineligible accounts, expired/stale/future trials, expiry during quota reservation, malformed/oversized inputs, obvious contact data, absent configuration, storage failure, provider HTTP errors, bad/truncated/refused JSON, scoring caps, invalid feedback, exact Appwrite SDK 17 arguments, stale results, consent, basic fallback, caching, Copy and text-only output. Sixty concurrent quota requests admit one provider slot; user/shared caps and the minute-boundary cooldown pass.

## Material fixes

PR #38 called the pinned positional Appwrite SDK using an object argument. The corrected call was tested against the actual published SDK 17 package. AI now runs before and independently of the rule-based checker. No pending or failed request displays an invented AI score. Only the explicit basic fallback invokes the legacy checker. Correction, three bilingual fixes and the clearly fictional model answer are separate.

Quota and error safeguards are implemented but require a dedicated server-only Appwrite quota table and reviewed dynamic-key scopes before deployment. AI additionally requires server-managed `sikauaiapproved` pilot enrollment; this does not grant or modify membership. Children/unknown-age accounts must not be enrolled before the privacy process is reviewed.

## Remaining launch gates

1. User signs in to Groq personally. Inspect the actual Free plan/limits and Data Controls; enable Zero Data Retention without a paid upgrade. Securely place the key only in Appwrite.
2. Obtain approval for changing the production Trial Manager entrypoint to share its existing free Function slot. Preserve its original deployment/settings and retain authenticated execution. Provision only the dedicated quota table and necessary reviewed scopes.
3. Deploy without enabling the public frontend flag; test real authorization, counter permissions, failures, quotas and `test/grammar-cases.json`, including long/unseen writing and all previously reported failures.
4. Finish real responsive/dark visual QA and an authorized live account check, then publish the verified frontend flag. Keep minors outside the pilot until required notices, consent and retention practices are approved.

Rollback: disable `WRITING_AI_ENABLED`, restore `writingAI:null`, and if needed reactivate Trial Manager deployment `6ace11cdafb2432f9aec` with `src/main.js`. Frontend rollback should be a revert commit, preserving history. Never reset trial rows or memberships.
