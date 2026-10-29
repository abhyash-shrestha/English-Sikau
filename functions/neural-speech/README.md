# English Sikau natural neural voices (not yet activated)

This function is a secure **optional** Azure Speech backend for the existing Appwrite Frankfurt project. It does **not** work until a Speech resource and Appwrite function are created and activated. No credentials belong in GitHub.

## Setup
1. Create an Azure Speech resource. Consider the **F0 free tier** if your account is eligible. Azure may require billing verification; do not assume every account can sign up without a payment method. Set usage alerts and verify quota/pricing before enabling paid usage.
2. In Appwrite project `6ac9b80d0009575e5d4d`, create a Node.js 20+ Function with ID **sikau-neural-speech** and root **functions/neural-speech**, entrypoint **src/main.js**.
3. **Execute permissions: signed-in Users only.** Do not enable `Any`, a public domain, or request/response-body logs. Timeout at least 20 seconds. Keep execution responses private.
4. Configure private function environment variables `AZURE_SPEECH_KEY` and `AZURE_SPEECH_REGION`, e.g. `eastus`. Never add those values to GitHub or share them in ChatGPT.
5. Deploy the function, verify a paid test account and trial account can call it and an unauthenticated account cannot. Check the browser/iOS audio unlock.
6. **Only after successful deployment**, switch `speechAI:null` to `speechAI:'sikau-neural-speech'` in public `index.html`. Until then, the app retains its browser-voice fallback.
7. Test all 4 voices: **ne-NP-HemkalaNeural**, **ne-NP-SagarNeural**, **en-US-AvaNeural**, **en-US-AndrewNeural**. Test Reading and Translate, male/female, active memberships, provider 429 errors, multiple sentences, iPhone Safari and macOS Safari.
8. Inform learners that audio synthesis sends the text they choose to play to Azure Speech. Do not enter private information in listening exercises.

The backend verifies the signed-in user's Appwrite JWT and paid/trial entitlement. It rejects requests over 550 characters and bursts over 12 requests/minute per warm instance. **The in-memory counter is not a durable global quota**; add a shared per-account quota with Appwrite TablesDB before broad release. Speech usage is subject to provider quotas and charges beyond any free allowance. No student audio or text is stored by the function.
