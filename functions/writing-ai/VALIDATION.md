# Writing AI validation — 21 October 2026

**Status: backend deployed; AI disabled; live frontend not activated.** The current sign-in has an expired trial and correctly remains locked. No membership, trial clock, student account or progress record was modified to bypass that restriction.

## Connections and deployment

- GitHub PR #39 contains the prepared frontend/backend changes; the original base was `87ed33fbe645226c4cf038b5d425e358af3f12fc`. During this work, `main` advanced to `60b11538a18183070189ad433de45a23dea79737` with sidebar, games, Nepal Explorer and repository cleanup changes. The writing branch incorporates those changes and preserves the cleanup. No writing frontend activation has been published.
- Appwrite Frankfurt project `6ac9b80d0009575e5d4d` remains on Free, with two of two Function slots used. No paid upgrade or new Function was added.
- The owner separately approved sharing the existing Trial Manager Function `6acaf5fe00349b7b8d3d`. Active deployment: **`6ad8e0368fbe5d6d31b8`**, Node.js 22, build ready in two seconds. Entrypoint `src/with-writing-ai.js`, timeout 35 seconds, execution logging disabled, no added dynamic-key scopes. Existing authenticated-user execution permission is retained.
- Original Trial Manager source is preserved byte for byte: main SHA-256 `e431cace7bd23cc62983649d925b6a5d80122d4eb7e3a4f6aec81f3f81160da0`. Its original deployment `6ace11cdafb2432f9aec` remains Ready for rollback. The new adapter delegates all legacy actions unchanged.
- Groq billing shows Free/$0. Actual limits for `openai/gpt-oss-20b`: 30 RPM, 1,000 RPD, 8,000 TPM, 200,000 TPD. Inference API ZDR displays Enabled; global ZDR remains disabled. A previous automated ZDR confirmation was rejected by automatic approval review; a later read showed Enabled without any confirmation retry. This does not attribute the change to the rejected action.
- An approved Groq server key was copied directly from Groq into Appwrite secret **`GROQ_API_KEY`**. Its value was never printed, saved in source or shown in a screenshot. The clipboard was cleared. An earlier owner-created key remains unused; no key was deleted.
- `WRITING_AI_ENABLED=false`, `GROQ_FREE_TIER_CONFIRMED=true`, `WRITING_AI_DATABASE_ID=6acaf17b000448d3d30f`, `WRITING_AI_QUOTA_TABLE_ID=6ad8d2a400056e7b17f5` are configured. Existing variables are retained. A server-to-Groq call with this stored key has **not** yet been verified.
- The dedicated AI quota table has no client permissions and no row-level exceptions. Required integer `count` is bounded 0–16. Anonymous reads returned HTTP 401. Existing trial/progress tables were not edited.

## Tests actually completed

| Test | Observed result | Practical limit |
| --- | --- | --- |
| Backend, quota, real SDK 17 transport, dashboard and existing browser-security suites | 67 passed, 0 failed; one network-integrity test skipped in combined run | Account, provider and quota responses simulated |
| Actual pinned CDN SDK integrity | Both Appwrite 17 files matched SHA-384 in the earlier explicit network check | No student sign-in tested by this check |
| Downloaded production Trial Manager through the final shared adapter | 15 passed, 0 failed | Isolated services; no real student writes |
| Real Groq quality study | 17 distinct synthetic cases ultimately passed review normalization and manual correction inspection | Groq Playground JSON-object mode; production uses strict JSON schema |
| Real provider failure observations in the release study | Two empty responses and one incomplete JSON object; each passed one manual retest | Production deliberately has no automatic retry; these attempts would receive a safe fallback |
| Anonymous Appwrite Function execution API | HTTP 401, authenticated-user execute permission required | Positive execution still needs an eligible account |
| Deployed writing action from console without a valid project-student JWT | HTTP 401, safe bilingual sign-in response | Does not establish a successful Groq call |
| Live website with verified but expired-trial account | Trial-completed lock retained; lessons unavailable | No membership or trial was changed |
| Live authenticated quota reservation, strict provider response and writing UI | Pending | Current test sign-in is expired |
| Phone/tablet/desktop and dark-mode visual QA | Pending | DOM contracts pass; final protected writing screen needs an authorized account |

The automated cases include forged/anonymous/unverified/disabled/ineligible users, stale/expired/future trials, expiry during reservation, quota failures/concurrency/caps, provider 429/500/timeouts/malformed/refused/truncated responses, consent, XSS-safe text rendering, Copy, stale edits/topics, caching and the exact positional Appwrite Web SDK 17 call. Sixty concurrent reservations admitted one provider slot. Missing configuration fails closed.

## Real grammar and scoring evidence

Inputs and complete normalized synthetic outputs are versioned in `test/grammar-cases.json` and `test/quality-results-20261021.json`. The release study includes 20 attempts: 17 successful reviews and 3 failed initial responses. Earlier prompt experiments are not counted as release passes.

| Case | Final score | Correction/relevance finding |
| --- | ---: | --- |
| Family/Dashain | 90 | have/members/took; context-supported hadn't seen; facts retained |
| Daily routine | 90 | I wake up, eat, go |
| Yesterday | 90 | went/bought/met/talked/returned |
| Teacher/present | 86 | explains/helps/has/lessons are/gives |
| Future plans | 90 | will go/will cook/going to buy |
| Pokhara/Phewa | 96 | place names and brother retained; like/looks/enjoyed |
| School | 90 | built/brought/learned/plants need/working together was |
| Work | 90 | stopped/restarted/were/solved; valid present feeling retained |
| Short perfect answer | 100 | unchanged, no invented errors |
| Perfect family paragraph | 100 | unchanged, no invented errors |
| Momo answer to friend topic | 10 | off-topic; momo paragraph preserved, no invented friend story |
| Partly relevant family/shop | 65 | partial; missing family memory identified |
| Spelling/unnatural structure | 78 | friend/beautiful/together; natural walk and enjoyment phrasing |
| Mixed English/Nepali | 96 | clear Nepali momo sentence translated; teaches/feel |
| Didn't saw, simple past context | 96 | didn't see, preserving ten minutes and phone call |
| Unseen power-cut topic | 90 | went out/helped/safely/to keep; lamp/stairs facts retained |
| Long library activity, 210 words | 78 | tense/agreement throughout; six students, twelve books, three shelves, times and future plan retained |

The five reported failures passed within full paragraphs, not isolated substitution tests. Numeric scores are calculated from AI-selected rating bands; they remain estimates and have not been calibrated against human grading. Reviewed English/Nepali explanation strings avoid the reversed translations and misleading free-form rules found during earlier experiments. They are presentation copy, not a fixed-rule correction engine.

## Remaining launch gates

1. Sign into the live website with an existing, verified paid or active-trial account. Review that adult account for `sikauaiapproved` enrollment without changing paid status or trial dates. Do not enroll children or unknown-age users before the owner completes the privacy/guardian-consent process.
2. Enable the backend only for that reviewed pilot, redeploy the variable change, and verify the actual stored key, server quota writes, strict-schema response, negative access cases and limits.
3. Finish real responsive/light/dark visual checks and an authorized live website submission. Then activate `CFG.writingAI` and merge/publish the tested frontend. Until then, no claim is made that the live website uses Groq.

## Rollback

Keep `WRITING_AI_ENABLED=false` and redeploy to stop provider calls. Keep/restore `CFG.writingAI:null` for the frontend. Reactivate original Trial Manager deployment `6ace11cdafb2432f9aec` with original entrypoint `src/main.js`, timeout 15 seconds and its saved logging setting if a shared-service regression occurs. Original source and package hashes are preserved in the deployment manifest. Revert only the eventual writing frontend merge rather than rewriting history; retain the newer main baseline `60b11538a18183070189ad433de45a23dea79737` and unrelated improvements. Never delete or reset accounts, memberships, trial rows or progress.
