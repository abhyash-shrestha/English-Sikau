# English Sikau natural neural voices (not yet activated)

This function is a secure **optional** Azure Speech backend for the existing Appwrite Frankfurt project. It does **not** work until a Speech resource and Appwrite function are created and activated. No credentials belong in GitHub.

## Setup
1. **Choose one speech provider:** **Google AI Studio Gemini 2.5 Flash Preview TTS** is a free-tier-capable alternative and supports Nepali and English; request a key through Google AI Studio without adding it to GitHub. Free model quotas and data-use terms apply (free-tier content may be used to improve products). Or use **Azure Speech F0**, which offers native **Hemkala/Sagar** and **Ava/Andrew** neural voices but Azure registration generally requires card verification. The system never promises a permanently free/uncapped provider.
2. In Appwrite project `6ac9b80d0009575e5d4d`, create a Node.js 20+ Function with ID **sikau-neural-speech** and root **functions/neural-speech**, entrypoint **src/main.js**.
3. **Execute permissions: signed-in Users only.** Do not enable `Any`, a public domain, or request/response-body logs. Timeout at least 20 seconds. Keep execution responses private.
4. Configure private function environment variables:
   - **Gemini (no Azure required):** `GEMINI_API_KEY` and `SPEECH_PROVIDER=gemini`. Uses Google AI Studio model `gemini-2.5-flash-preview-tts`, female voice **Kore**, male voice **Charon** (Nepali pronunciation should be independently auditioned before public rollout).
   - **Azure:** `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`, and optionally `SPEECH_PROVIDER=azure`. Choose your Speech region such as `eastus`.
   - Never publish keys to GitHub or pass keys into public JavaScript.
5. Deploy the function, verify a paid test account and trial account can call it and an unauthenticated account cannot. Check the browser/iOS audio unlock.
6. **Only after successful deployment**, switch `speechAI:null` to `speechAI:'sikau-neural-speech'` in public `index.html`. Until then, the app retains its browser-voice fallback.
7. Test both languages/genders. With Azure: **ne-NP-HemkalaNeural**, **ne-NP-SagarNeural**, **en-US-AvaNeural**, **en-US-AndrewNeural**. With Gemini: **Kore** (female) and **Charon** (male); pronunciation and grammatical faithfulness should be checked with native Nepali speakers. Test Reading and Translate, an existing male/female switch, active memberships, free-tier 429 errors, multiple sentences, iPhone Safari and macOS Safari.
8. Inform learners that speech synthesis sends the selected text to the configured provider (Google or Microsoft). Free Gemini API data may be used to improve Google's products; do not enter private information in listening exercises.

The backend verifies the signed-in user's Appwrite JWT and paid/trial entitlement. It rejects requests over 550 characters and bursts over 12 requests/minute per warm instance. **The in-memory counter is not a durable global quota**; add a shared per-account quota with Appwrite TablesDB before broad release. Speech usage is subject to provider quotas and charges beyond any free allowance. No student audio or text is stored by the function.
