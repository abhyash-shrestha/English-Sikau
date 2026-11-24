# English Sikau 2 — clean-room frontend rewrite

This is an independent React/TypeScript application. No legacy HTML, DOM patching, private lesson iframe, or legacy styles are loaded. The browser entry point is a minimal HTML mount. It is intentionally a development preview, not production.

## Run
Node 22.12+; from this directory: npm install, npm test, npm run build, npm run dev.

## What works
Responsive bilingual and Roman Nepali navigation, dedicated festival screen, sample conversation choices, phrasebook matching, story quizzes, vocabulary, basic writing check, browser text-to-speech, typed word game, visa practice and session-only preview progress. Existing Appwrite password sign-in and read-only paid progress are wired to the existing public SDK configuration but not live-tested. No paid curriculum, private lesson download, trial state, payment approval or cloud progress writes are reimplemented. Registration, OTP, reset, membership and the complete original lessons remain on the original website. No fake AI translation, grading, or current festival dates.

## Release gate
Before any production swap: test build and UI on actual devices; create a staging Appwrite project or approved test account, verify all account flows and entitlement enforcement; migrate the protected lesson data and its server-side access rules with authorized access; preserve learner progress and migrate content only behind backend permission checks; implement and validate translation, speech, writing, game, festival calendar and visa flows to full parity; use a reviewed lockfile and secure deployment configuration. Do not publish paid lesson data in a static bundle. Maintain rollback.
