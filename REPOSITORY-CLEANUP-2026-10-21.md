# English Sikau repository cleanup — 2026-10-21

## Change
Removed 24 obsolete tracked files (4,012,458 bytes of checked-out files) from the default website branch:
- 11 staging / launch-candidate HTML versions.
- 7 historic backup files (including an exact duplicate).
- 2 historical security-review copies.
- 1 lesson API pilot page.
- 2 obsolete Translate dashboard files, replaced by `translate-studio-v4.js` and its CSS.
- 1 unused writing-quality helper, already embedded in the active `index.html`.

## Verified safeguard
The original branch tip is preserved as `backup/pre-cleanup-2026-10-21` (commit `dc5ab970669f3fd23fda33ebdeaba29872ccd0c5`).
All existing production scripts, CSS, active `index.html`, assets, functions, and tests had the **same blob SHA** after removal as on the preceding `main` branch. No active file content was modified.
No Appwrite Function, user record, payment, trial state, student XP or protected private lessons were changed.

## Rollback
A deleted file can be retrieved from the backup branch. To restore the whole original working tree, revert the merged cleanup commit, rather than force resetting live `main`.

## Important limitations
- GitHub history and the backup branch still retain the old files. This cleanup is **not a sensitive-data purge**.
- Historical direct links to staging/pilot HTML files on the default branch will cease to work after deployment.
- GitHub Pages publishing and signed-in browser features require a live smoke test.
- Appwrite was not inspected because no direct Appwrite connection was available.
- File removal reduces checked-out tree size; it does not necessarily shrink the existing Git repository history.

## Suggested smoke tests
Sign in with a verified paid or active-trial account; test navigation, Game, Translate, Write, Read, progress, private lesson locks, and mobile layout. Check browser console for missing assets. No student or Appwrite data should be reset.
