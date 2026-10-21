# English Sikau AI Writing Coach — Appwrite setup

This feature is optional until its private backend exists. No secret belongs in GitHub Pages.

1. Create a free Groq account and API key at https://console.groq.com/keys. Do not share the key in chat or commit it to GitHub. Consider enabling Zero Data Retention under Groq Data Controls.
2. In your current Appwrite project, create a new function with exact ID **sikau-writing-ai**, runtime Node.js 20 or newer.
3. Connect this GitHub repository, set root directory **functions/writing-ai**, entrypoint **src/main.js**, build command **npm install** if required.
4. Under Execute access, choose **Users (authenticated)** only — NOT Any. Disable publicly accessible/custom domains and disable execution body logging.
5. Add secret function variable **GROQ_API_KEY** with your private key, then deploy and activate the function; timeout at least 25 seconds.
6. In **index.html** change `writingAI:null` to `writingAI:'sikau-writing-ai'` and publish only after confirming a signed-in function execution works.
7. Re-test with the daily routine, Dashain/family, off-topic, already-correct examples and with simulated provider 429/timeout.
8. Tell students clicking Check my writing sends their essay and topic to Groq for feedback. Avoid entering sensitive personal details.

Free provider limits and Appwrite platform quotas still apply. No paid tier is required, but free access is not unlimited. Browser code retains the original local checker as fallback. Your private lesson authorization and XP/progress are untouched.

The server requires a signed-in, email-verified account JWT validated using the Appwrite /account endpoint. It also verifies that the user has the permanent paid label or an active server-confirmed trial through the existing trial status function. If the entitlement check fails, it refuses the AI request. Consider server-side per-account rate limiting with Appwrite TablesDB for larger public usage.
