# English Sikau AI Writing Coach

The single-account backend pilot is deployed at Appwrite deployment `6ada6e1702354f572b1d`, from reviewed source `48a3271fc59a9f2f56ec72e2285bab45157ce43f`. `WRITING_AI_ENABLED=true` and both exact account bindings are saved server-side as secrets. Admission still requires `sikauaiapproved`; that label is **not saved**. The owner explicitly approved the correct account, but automatic approval review rejected the browser Save because it requires confirmation at action time. The label is prepared for the owner's manual Update click. No other account has access. The live Writing UI still has `writingAI:null`.

A temporary authenticated verification page is published by main commit `06f8b2024e07d9774067ea39792966c23e6127c7`. The new backend returned HTTP 401 with a safe bilingual message when called without a valid project-student JWT. The stored Groq key and positive strict-schema/quota path remain unverified pending enrollment and correct-account sign-in. See `VALIDATION.md`.

The latest follow-up reloaded the account and found no saved AI label; the cloud browser still lacked the approved account's session. A different account was selected in secure sign-in, and automatic approval review rejected completing that authentication. The proposed frontend now hides AI controls unless the verified account has both the existing internal-test and reviewed AI labels. The exact private account binding remains server-side. Twenty focused client/dashboard/security tests passed, with one optional network test skipped; the normal Writing UI remains unactivated.

## Verified deployment constraint — 21 October 2026

The signed-in Appwrite organization is on **Free** and already uses both allowed Functions:

- Trial Manager: `6acaf5fe00349b7b8d3d`, Node.js 22, active writing-capable deployment `6ad8e0368fbe5d6d31b8`; original rollback deployment `6ace11cdafb2432f9aec`.
- Trial Pass: `6acc34ea0003a1c0c25a`.

A third Function cannot be created on this plan. Do not upgrade, delete either existing Function, create duplicate Groq organizations, or change existing student records.

The owner approved and deployed the shared alternative, `src/shared-handler.js`: add only the `writing-review` action to the existing Trial Manager deployment. All other actions pass the original request/response context straight to its unchanged handler. Trial checks for writing invoke the existing `status` handler directly, avoiding recursive Function executions. The owner separately approved the production entrypoint change, 35-second timeout and disabled execution logging. Original trial source, membership labels and trial dates are preserved.

To prepare a package, download the current Trial Manager source, then run:

```sh
node scripts/prepare-shared.mjs /path/to/downloaded-source /path/to/new-output
```

The script refuses an unexpected legacy package, copies the legacy source without modifying it, adds the writing modules and creates `src/with-writing-ai.js`. It records the original source SHA-256 in `package-manifest.json`. It does not upload or activate anything. Keep the original deployment ready for rollback.

## Backend configuration

Use Node.js 22. For a shared package, keep its existing dependencies and lockfile and use `npm ci --omit=dev`; entrypoint `src/with-writing-ai.js`. The standalone package uses `src/main.js`, but there is currently no third free Function slot. Set Function timeout to at least 35 seconds; the writing network deadline is 26 seconds and the browser deadline is 35 seconds. All legacy Function settings must be reviewed/preserved before deployment.

Environment variables:

| Variable | Purpose |
| --- | --- |
| `GROQ_API_KEY` | Secret Groq key, entered directly in Appwrite. Never put it in GitHub, browser source, chat, screenshots or logs. |
| `WRITING_AI_ENABLED` | `false` until staged tests pass; `true` enables only approved eligible accounts. |
| `GROQ_FREE_TIER_CONFIRMED` | Set `true` only after inspecting the actual Groq account plan and limits. |
| `WRITING_AI_DATABASE_ID` | Existing project database containing a dedicated quota table. |
| `WRITING_AI_QUOTA_TABLE_ID` | Dedicated AI-only table; never the trial or learning progress table. |
| `WRITING_AI_PILOT_USER_ID` | Required exact server-side account binding for this single-account pilot. Missing or different IDs block even verified paid users with pilot labels. Never supplied by the browser. |
| `WRITING_AI_QA_USER_ID` | Optional server-only binding to one existing internal test member. Requires `sikautestpaid` AND `sikauaiapproved`; never taken from the browser. Leave unset until that specific pilot grant is approved. |

Create the quota table with one required integer column named `count`, minimum 0, maximum at least 16. Give it **no client read/create/update/delete permissions** and leave row-level security disabled so row permissions cannot grant extra client access. Counter rows also use empty permissions. In the shared deployment, reuse the existing server-only `TRIAL_SERVER_API_KEY` row credential already used by the unchanged legacy handler. The inspected Trial Manager has zero dynamic-key scopes; no new Function scopes are needed in this shared configuration. A standalone Function can instead use an Appwrite-injected dynamic key with `rows.read` and `rows.write`. No user-directory or administrative write scopes are needed. Missing configuration or storage failure blocks AI calls. Do not broaden existing credentials without reviewing their scope.

Execution must require authenticated users. Do not create a public writing domain. For a shared Function, inspect the existing domain and execution configuration before deployment; the writing action additionally validates the caller JWT through `/account` and rejects unauthenticated direct-domain requests. Disable execution logging. Review Appwrite execution-response retention: application code does not log essays, but disabling stdout/stderr logs is not a guarantee that Appwrite retains no response bodies.

This release is a single-account pilot: the verified caller must exactly match server variable `WRITING_AI_PILOT_USER_ID`. Student eligibility also requires an active verified account, the server-managed `sikaupaid` membership or an active original one-hour trial, **and** the server-managed `sikauaiapproved` pilot label. The prepared QA extension additionally recognizes one existing internal test member only when its ID matches server variable `WRITING_AI_QA_USER_ID`, its existing `sikautestpaid` role remains present, and it has reviewed pilot enrollment. The QA path keeps every input/privacy/provider/quota check; it grants no membership or trial. This extension is now deployed; reviewed pilot enrollment is still required. Browser-submitted labels, age, paid flags and preferences never grant access. Do not mass-enroll accounts or change memberships. Pilot enrollment does not assert parental consent and must initially be limited to reviewed adult accounts.

## Free allowance protection

Groq currently publishes, for `openai/gpt-oss-20b`, free limits of 30 requests/minute, 1,000 requests/day, 8,000 tokens/minute and 200,000 tokens/day. Actual organization limits are authoritative: <https://console.groq.com/docs/rate-limits>.

This pilot uses atomic server-side counters shared across all runtime instances: five attempts per account per UTC day, sixteen attempts for the whole app per UTC day, and two overlapping cooldown windows preventing requests less than 60 seconds apart. Depending on timing, the cooldown can last up to two minutes. Provider failures consume a reservation and are never automatically retried or refunded. Quota checks fail closed; there is no in-memory fallback. A 7,500-byte serialized input bound plus 3,200 maximum output/reasoning tokens and a 512-token protocol reserve keeps sixteen app reservations below 180,000 tokens/day. The model uses low reasoning effort to reserve response space for full corrections; reasoning is never returned to students. The 22 October Pokhara study exposed incomplete/empty responses at medium effort; see the recorded evidence. Provider limits still apply, including rolling windows and other uses of the same organization; the pilot cannot reserve capacity for unrelated applications. Only a confirmed free account with no paid upgrade meets the zero-cost launch requirement.

The quota table stores counts and hashed account references, never writing, names, email addresses or model responses. Counters currently accumulate; review dedicated-table retention as usage grows. Do not apply cleanup to student/trial/progress tables.

## Privacy and younger learners

Groq's services agreement, rechecked on 22 October 2026, requires age 18+ for access to the Cloud Services and permits API integration into customer applications. Its privacy/consent and end-user obligations do not establish blanket permission for children's submissions. Resolve the applicable provider conditions and guardian-consent process before any minor enrollment. See sections 2, 3.1, 3.2 and 6.2 of <https://console.groq.com/docs/legal/services-agreement>. Groq's website privacy policy distinguishes website/account data from API customer data: <https://groq.com/privacy-policy>.

Before enrolling children: review age-appropriate notices, applicable parental-consent requirements, supervision and deletion/retention practices. Obtain any required verified guardian consent; an ordinary checkbox is not a substitute. Keep minors and unknown-age accounts outside the pilot until that process is approved. English Sikau's existing non-AI learning remains available to all ages according to existing memberships.

Enable Groq Zero Data Retention in Data Controls and disable persistence features. Current docs say inference is not retained by default except for reliability/abuse handling, with those logs retained for up to 30 days unless ZDR is enabled; usage metadata is still collected. See <https://console.groq.com/docs/your-data>. Verify the real settings rather than infer them from this document.

The frontend asks before sending the assignment and paragraph. It sends no account ID, email, profile, DOB or learning history to Groq. Obvious email/phone/account-number patterns in the submitted text are blocked server-side; this is not comprehensive anonymization. Students should use fictional names/initials and avoid private details. Reviews stay in page memory only, with a three-result cache. AI output is inserted as plain text, with a separate clearly fictional model answer. Do not treat estimated scores as grades determining educational eligibility.

## Review behavior

AI is the primary checker when configured: it does not wait for the old rule-based engine. The existing basic checker is an explicit fallback. Editing writing or changing topics invalidates pending results. Quota/error responses show a short bilingual message without inventing a score. Successful responses show a score/relevance, polished original paragraph with Copy, up to three English/Nepali fixes and an expandable fictional model answer.

The AI judges rating bands; the server maps them to stable rubric points. Relevance earns 30/15/0 for on-topic/partial/off-topic. Grammar bands earn 30/26/20/12/4; completeness 20/15/8/0; clarity 20/16/8/0. Partial totals are capped at 65 and off-topic at 10. These are advisory estimates, not standardized educational grades.

Real model tests found misleading free-form bilingual explanations and unstable raw numeric scores. The model now selects up to three original quotes, corrections and explanation categories. The server supplies reviewed, short English/Nepali teaching strings for those categories. The newer seven-case low-effort study, including failures and scoring/tense limitations, is recorded in `test/quality-results-20261022.json`. Those strings do not correct writing or assess the topic; correction, rating, error selection and model answers remain AI-generated, including for unseen topics.

The backend rejects unknown ratings/categories, incomplete/refused/truncated output and feedback quoting text absent from the original. The prompt preserves facts, requires context-appropriate tense and separates correction from fictional examples. These checks cannot prove semantic accuracy; the recorded real-model study covers seventeen synthetic scenarios and includes three failed initial responses.

## Verification and activation

```sh
npm ci --ignore-scripts
npm test
node --test ../../test/browser-security.test.mjs
```

Run the prepared shared deployment against the current legacy trial-security suite before upload. Use `test/grammar-cases.json` for real model evaluation. Recorded Groq Playground results are in `test/quality-results-20261021.json`: seventeen scenarios, including a 210-word paragraph, plus three failed initial responses that each passed one manual retest. All five reported correction examples passed in context. Those 21 October tests used the earlier medium-effort setting. The 22 October continuation uses low effort and records seven more final-prompt checks: six accepted, one malformed JSON rejected, plus three exploratory attempts. All Playground tests used JSON-object mode; the deployed strict-schema path, server quota writes and authorized live account still require end-to-end verification. Production does not retry automatically.

A temporary `writing-ai-verify.html` page is prepared on the draft branch for authenticated synthetic backend checks. It uses the same tested pinned SDK loader, contains no lessons or credentials, and is now published for the narrow approved pilot. Remove it after verification. Exact-account approval has been supplied and both server bindings are saved. The access label remains unsaved after an automatic approval-review rejection; the owner must complete the prepared Update action manually.

After the backend passes staged authorization/quota/provider tests, finish real phone/tablet/desktop light/dark visual QA and test the live site with a properly authorized account. Only then set `CFG.writingAI` to the verified Function ID and publish. Keep the basic fallback and kill switch.

## Rollback

1. Set `WRITING_AI_ENABLED=false` **and redeploy** to stop writing-provider calls while leaving legacy actions routed normally. Appwrite displays that variable changes require redeployment.
2. Restore `CFG.writingAI:null` and republish the frontend.
3. If the shared deployment causes any regression, reactivate Trial Manager deployment `6ace11cdafb2432f9aec` and restore entrypoint `src/main.js` and its saved settings. Do not delete trials or change dates/labels.
4. Pre-activation main baseline: `2e27eb6340fb109bfed1790fdd0464bc04891e37` (includes PR #45; original PR base: `87ed33fbe645226c4cf038b5d425e358af3f12fc`). Revert only the writing merge and preserve the newer sidebar/game/map/cleanup changes; never reset main history.
