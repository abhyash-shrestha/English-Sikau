# Nepal Explorer · keep all 77 districts, without points

English Sikau's Game tab contains an optional Nepal map puzzle. The map is for exploring geography through English practice, **not a currency, XP, coins, badge, or rewards system**.

## What stays
- Interactive map with all 77 districts, seven provinces, Nepali/English names and district headquarters.
- The exact **0 / 77 districts** counter, updated as students finish districts.
- Kathmandu-first route, interactive map selection and highlighted completed districts.
- House, tree and pagoda puzzle pieces; three separate Nepal calendar days of qualifying English missions (at least 80% correct, 3+ questions) reveal one district.
- Native English Game questions, correct/incorrect feedback, timers, mission completion and chapter progression.

## What is removed
- Explorer points: no new point additions, point totals, bonus for perfect scores, or point-earning announcements.
- Claiming a map piece uses **Add today's Nepal map piece**, not a coins/points purchase or reward.
- Existing local saves migrate automatically: `days` and `lastDay` stay intact while the retired `points` field is omitted. **Already unlocked districts do not reset**.
- General progress UI now shows completed chapters, words, reading, writing and recorded practice activity. XP/streak/mastery/achievement cards and the native Game reward HUD are hidden.

## Persistence and limits
District progress is local to the learner's browser and account (not synced across devices); clearing browser data may remove it. These are exploratory map pieces, not verified memberships or security permissions. Game qualification remains client-side and does not certify proficiency.

The protected course's internal scoring and server progress schema are retained for compatibility and to preserve chapter unlocking and the 77-district puzzle. They are no longer exposed as an earning/points interface. Modifying those private backend ledgers could disrupt current learner history and is not part of this change.

## Credits
See `assets/NEPAL-DISTRICTS-ATTRIBUTION.md`. The simplified district boundaries are educational, not official surveying coordinates.

## Regression checks
Existing district stamps, 0/77 and 1/77 counter, score 80% rule, qualifying 5/6, failed mission, duplicate same Nepal date, third stamp unlocking, next district, browser refresh, theme, tablet/phone width, keyboard map navigation.
