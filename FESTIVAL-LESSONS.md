# English Sikau — Nepali Festival Story Lessons

## What learners see

Click **Learn Festival English · अंग्रेजी सिक्नुहोस्** on an upcoming festival card to open a friendly, visual mini-lesson:
- Original short English story, with a Nepali translation toggle
- Three visual traditions/cultural moments and a short fact
- Five English vocabulary words with Nepali translations
- Example English sentence and optional browser text-to-speech
- Two-choice rounds with three options each, bilingual feedback and a replay option
- A simple Back to Festivals control

This is learning-only UI inside the **already-authorized** lesson iframe. The quiz awards **no XP or achievements** and does not touch authorization, data, payments, Appwrite, trial durations or progress.

## Updated calendar and automatic slots

The lesson list derives exclusively from the existing published `SIKAU_FESTIVAL_PREVIEW` and `SIKAU_NEXT_FESTIVALS` records in `index.html`. No festival dates are invented by the frontend.

Only entries whose **final date is on or after today in Nepal (Asia/Kathmandu)** appear. A multi-day festival remains until its **last** day. The list re-sorts automatically, shows 12 cards initially, and allows viewing the rest with **Show more upcoming**. As older celebrations expire, the next known published events naturally fill those slots. The app checks again every minute while visible, plus on tab visibility and window focus.

Added verified entries:
- December 24, 2026: Yomari Punhi / Udhauli / Dhanya Purnima (distinct community observances on the same date)
- February 11, 2027: Basanta Panchami / Saraswati Puja
- February 19, 2027: National Democracy Day
- April 6, 2027: Ghode Jatra (Kathmandu Valley)
- April 14, 2027: Nepali New Year 2084
- Holi: March **21–22, 2027** (hills and Terai dates)

**Source calendar:** [Ministry of Home Affairs — 2083 public holidays](https://moha.gov.np/en/page/government-and-public-holidays-in-2083), cross-checked with [Nepal Embassy, Tel Aviv](https://il.nepalembassy.gov.np/pages/embassy-holidays/) and [Pradhan & Associates 2083 summary](https://www.pradhanlaw.com/publications/list-of-public-holidays-2083-202627). For Nepali New Year 2084, calendar date cross-checked against the published [Baisakh 2084 calendar](https://topnepali.com/tools/calendar/2084/1).

**Important:** The app has dated entries only through **April 14, 2027**. Once those expire, it shows a clear "no more published dates" notice rather than creating fake dates or implying an automatic official calendar subscription. Adding confirmed dates for the next Nepali year is a separate content update. This is a rollover of known events, not continuous remote data discovery.

## Cultural accuracy and coverage

All 15 dated entries have original matching lessons in `festival-stories.js`. Tamu (Gurung), Sonam (Tamang) and Gyalpo (Sherpa/Himalayan) Lhosar have **different** lessons. Yomari Punhi, Udhauli and Dhanya Purnima are explained as distinct traditions sharing a date. Regional Holi dates are shown as a range. An intentionally generic educational fallback exists for additional, previously unmodeled festivals so it will not invent their history.

## Checks

Run `node --test test/festival-learning.test.mjs` to verify date rollover, every festival story/quiz, and no changes to Appwrite/XP. Additional direct code-mode tests exercised a simulated click-to-story, vocabulary, both quiz questions, feedback, finish and return flow. A signed-in real mobile/desktop browser test is still recommended for UI visuals and speech playback.
