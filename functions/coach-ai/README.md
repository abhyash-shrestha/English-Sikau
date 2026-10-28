# English Sikau Adaptive Conversation AI — secure Appwrite deployment

This code is **not active on GitHub Pages until a separate private backend is deployed**. Do not put GROQ_API_KEY in `index.html`, JavaScript, or GitHub.

1. In your existing Appwrite Frankfurt project, create an Appwrite Function with ID `sikau-coach-ai`, runtime Node.js 20+, code root `functions/coach-ai`, entrypoint `src/main.js`.
2. Configure **Execute access: authenticated Users only**. Do not allow public/Any execution or a public custom domain. Disable execution-body logging.
3. Add secret environment variable `GROQ_API_KEY` in Appwrite function settings. Use Groq's free-tier model `openai/gpt-oss-20b`. Deploy and activate the function; use a timeout of at least 25s.
4. Confirm verified paying students (`sikaupaid`, `sikautestpaid`) and valid trial users can execute it, and expired/non-verified users cannot. Check provider quota/error handling and do not send sensitive information in practice.
5. **Only after successful deployment**, change `coachAI:null` to `coachAI:'sikau-coach-ai'` in public `index.html`. Rebuild/publish the site. The function checks the Appwrite session and entitlement itself; the browser's checks are only UX.
6. Test a clothing return with question "Do you still have the receipt?" and answer "No, I don't" -> accepted true, corrected punctuation and a follow-up about alternative proof of purchase.
7. Test a positive answer, a contradiction, a typo, an off-topic reply, multi-turn topic continuity, free-tier 429, invalid JWT, expired trial, desktop/mobile and dark/light themes.

This backend uses the existing paid/trial entitlement rules without changing membership labels or XP. No conversation content is stored by this function.

**Operational limits:** Groq free-tier and Appwrite usage limits apply. For broad deployment, add centrally enforced per-user quotas and request throttling to avoid exhausting the shared free allowance. The offline fallback is deliberately limited; it does not provide genuine AI grammar review or open-ended conversation.
