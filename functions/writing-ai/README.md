# English Sikau AI Writing Coach

This implementation is **not live**. The frontend feature flag remains `writingAI:null` until the backend, privacy settings and real model behavior have been verified.

## Verified deployment constraint — 21 October 2026

The signed-in Appwrite organization is on **Free** and already uses both allowed Functions:

- Trial Manager: `6acaf5fe00349b7b8d3d`, Node.js 22, active deployment `6ace11cdafb2432f9aec`.
- Trial Pass: `6acc34ea0003a1c0c25a`.

A third Function cannot be created on this plan. Do not upgrade, delete either existing Function, create duplicate Groq organizations, or change existing student records.

A prepared alternative is `src/shared-handler.js`: add only the `writing-review` action to the existing Trial Manager deployment. All other actions pass the original request/response context straight to its unchanged handler. Trial checks for writing invoke the existing `status` handler directly, avoiding recursive Function executions. This changes the entrypoint of a production access service and requires separate production approval under the owner's instructions.

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

Create the quota table with one required integer column named `count`, minimum 0, maximum at least 16. Give it **no client read/create/update/delete permissions** and enable row security with empty row permissions. The Function's Appwrite-injected dynamic key needs `rows.read` and `rows.write`; no user-directory or administrative write scopes are needed by the writing modules. Missing configuration or storage failure blocks AI calls. Do not broaden existing credentials without reviewing their scope.

Execution must require authenticated users. Do not create a public writing domain. For a shared Function, inspect the existing domain and execution configuration before deployment; the writing action additionally validates the caller JWT through `/account` and rejects unauthenticated direct-domain requests. Disable execution logging. Review Appwrite execution-response retention: application code does not log essays, but disabling stdout/stderr logs is not a guarantee that Appwrite retains no response bodies.

Eligibility requires an active verified account, the server-managed `sikaupaid` membership or an active original one-hour trial, **and** the server-managed `sikauaiapproved` pilot label. Browser-submitted labels, age, paid flags and preferences never grant access. Do not mass-enroll accounts or change memberships. Pilot enrollment does not assert parental consent and must initially be limited to reviewed adult accounts.

## Free allowance protection

Groq currently publishes, for `openai/gpt-oss-20b`, free limits of 30 requests/minute, 1,000 requests/day, 8,000 tokens/minute and 200,000 tokens/day. Actual organization limits are authoritative: <https://console.groq.com/docs/rate-limits>.

This pilot uses atomic server-side counters shared across all runtime instances: five attempts per account per UTC day, sixteen attempts for the whole app per UTC day, and two overlapping cooldown windows preventing requests less than 60 seconds apart. Depending on timing, the cooldown can last up to two minutes. Provider failures consume a reservation and are never automatically retried or refunded. Quota checks fail closed; there is no in-memory fallback. A conservative input byte bound plus 2,400 maximum output/reasoning tokens limits each request. Provider limits still apply, including rolling windows and other uses of the same organization; the pilot cannot reserve capacity for unrelated applications. Only a confirmed free account with no paid upgrade meets the zero-cost launch requirement.

The quota table stores counts and hashed account references, never writing, names, email addresses or model responses. Counters currently accumulate; review dedicated-table retention as usage grows. Do not apply cleanup to student/trial/progress tables.

## Privacy and younger learners

Current Groq terms require the Groq account holder to be 18 or older. They separately address customer applications likely to be used by minors and put compliance responsibilities on the application owner; this is not a blanket statement that all end users must be adults. See sections 2 and 6.3 of <https://console.groq.com/docs/legal/services-agreement>. Groq's website privacy policy distinguishes website/account data from API customer data: <https://groq.com/privacy-policy>.

Before enrolling children: review age-appropriate notices, applicable parental-consent requirements, supervision and deletion/retention practices. Obtain any required verified guardian consent; an ordinary checkbox is not a substitute. Keep minors and unknown-age accounts outside the pilot until that process is approved. English Sikau's existing non-AI learning remains available to all ages according to existing memberships.

Enable Groq Zero Data Retention in Data Controls and disable persistence features. Current docs say inference is not retained by default except for reliability/abuse handling, with those logs retained for up to 30 days unless ZDR is enabled; usage metadata is still collected. See <https://console.groq.com/docs/your-data>. Verify the real settings rather than infer them from this document.

The frontend asks before sending the assignment and paragraph. It sends no account ID, email, profile, DOB or learning history to Groq. Obvious email/phone/account-number patterns in the submitted text are blocked server-side; this is not comprehensive anonymization. Students should use fictional names/initials and avoid private details. Reviews stay in page memory only, with a three-result cache. AI output is inserted as plain text, with a separate clearly fictional model answer. Do not treat estimated scores as grades determining educational eligibility.

## Review behavior

AI is the primary checker when configured: it does not wait for the old rule-based engine. The existing basic checker is an explicit fallback. Editing writing or changing topics invalidates pending results. Quota/error responses show a short bilingual message without inventing a score. Successful responses show a score/relevance, polished original paragraph with Copy, up to three English/Nepali fixes and an expandable fictional model answer.

The backend validates rubric component types/ranges, recomputes the total, caps off-topic scores at 10 and partial scores at 65, rejects incomplete/refused/truncated results, requires Nepali feedback, and rejects feedback quoting text absent from the student's original. Prompt instructions preserve facts, require context-appropriate tense and distinguish correction from invented examples. These checks do not prove factual preservation or grammar accuracy; real Groq evaluation remains required.

## Verification and activation

```sh
npm ci --ignore-scripts
npm test
node --test ../../test/browser-security.test.mjs
```

Run the prepared shared deployment against the current legacy trial-security suite before upload. Use `test/grammar-cases.json` for real model evaluation; test long paragraphs as well as the sixteen listed scenarios. Record actual returned corrections, scores, latency and failures. Do not claim canned/mock responses establish grammar quality. The five previously reported phrases and unseen topics still require live evaluation.

After the backend passes staged authorization/quota/provider tests, finish real phone/tablet/desktop light/dark visual QA and test the live site with a properly authorized account. Only then set `CFG.writingAI` to the verified Function ID and publish. Keep the basic fallback and kill switch.

## Rollback

1. Set `WRITING_AI_ENABLED=false` to stop writing-provider calls while leaving legacy actions routed normally.
2. Restore `CFG.writingAI:null` and republish the frontend.
3. If the shared deployment causes any regression, reactivate Trial Manager deployment `6ace11cdafb2432f9aec` and restore entrypoint `src/main.js` and its saved settings. Do not delete trials or change dates/labels.
4. Baseline frontend commit: `87ed33fbe645226c4cf038b5d425e358af3f12fc`. Use a revert commit for frontend rollback rather than rewriting main history.
