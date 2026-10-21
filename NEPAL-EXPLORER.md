# Nepal Explorer · 77 district puzzle (phase 1)

An optional long-term cosmetic reward for English Sikau. Existing chapter XP, original game XP, private lessons and authorization rules are untouched.

## Features
- Real interactive Nepal map with all 77 district outlines and Nepali/English names across seven provinces.
- Kathmandu first, then seven-province journey. Click a district to see its province and headquarters.
- Finish an existing native English Game mission (3+ questions, score at least 80%) to qualify for one map stamp.
- Claim 10 Explorer points (+5 for perfect scores), maximum once per Nepal calendar day.
- Three stamps on three separate days unlock a district and light up its map piece.
- House, tree and pagoda village puzzle represents the three collected stamps.
- Completing 77 districts requires at least 231 different days, even for a perfect student.

## Important limitations
Explorer stamps and points are local per-account cosmetics, saved only in this browser. They are not Appwrite-verified XP, not synced between devices, and clearing browser storage loses them. Browser localStorage can be edited, so it is not a security or paid-unlock boundary.
The original Game XP/coins and separate cloud-verified chapter XP are different ledgers. This feature doesn't combine or mutate them.

## Future phase: secure synced rewards
An authenticated Appwrite awards function must validate gameplay server-side, issue one award per Nepal day, atomically deduplicate events and store user-specific progress. It must never trust the client's reported score and must respect existing account entitlements. Not implemented here: the live private game engine and Appwrite deployment are unavailable in this GitHub-only session.

## Credits
See assets/NEPAL-DISTRICTS-ATTRIBUTION.md. The simplified district boundaries are educational, not official surveying coordinates.

## Browser tests needed
Quest 6/6 and 5/6 scores, score below 80%, duplicate on same day, next Nepal date, correct next district after three days, theme, device sizes, keyboard map access, account switch, refreshing, local storage limits.
