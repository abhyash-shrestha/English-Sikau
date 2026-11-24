# English Sikau — incremental TypeScript/React migration

This branch is deliberately separate from production. It extracts the existing public account stylesheet and classic application runtime without rewriting authentication or the private classroom. The original classroom is fetched from Appwrite after verified access. Do not publish the private lesson HTML, credentials, or server-side tokens in this repository.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm install
npm test
npm run build
npm run preview
```

The preview command serves the repository root. The Vite library build generates modern-dist/launcher.js, which mounts a typed React Home launcher inside the existing authenticated classroom. The original native buttons still perform every navigation action; the legacy launcher remains available if the new module does not mount. This is an initial migration, not a complete replacement.

## Verification before production

1. Verify build and tests; commit a reviewed lockfile.
2. Test sign-in, OTP, password reset, trial, payment approval and expired access against a non-production Appwrite account.
3. Compare every lesson tab, speech permissions, saved progress and mobile/desktop layout against production. Confirm bilingual and Roman preferences.
4. Migrate additional lesson interfaces individually behind the existing entitlement gate. Do not duplicate private lesson data in public static assets.
5. Choose GitHub Pages Actions deployment or another static host after reviewing configuration. Build and publish the complete site, not just the modern library bundle. Keep the previous production version available for rollback.

Python is suitable for future server-side speech or AI services, not a drop-in replacement for browser UI. Production remains on main until validation.
