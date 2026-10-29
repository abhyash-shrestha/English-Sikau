# English Sikau natural neural voices (not yet activated)

This function is a secure **optional** Azure Speech backend for the existing Appwrite Frankfurt project. It does **not** work until a Speech resource and Appwrite function are created and activated. No credentials belong in GitHub.

## Setup
1. **Choose one speech provider:** **Google AI Studio Gemini 3.8 Flash TTS** is a free-tier-capable alternative and supports Nepali and English; request a key through Google AI Studio without adding it to GitHub. Free model quotas and data-use terms apply (free-tier content may be used to improve products). Or use **Azure Speech F0**, which offers native **Hemkala/Sagar** and **Ava/Andrew** neural voices but Azure registration generally requires card verification. The system never promises a permanently free/uncapped provider.
2. In Appwrite project `6ac9b80d0009575e5d4d`, create a Node.js 20+ Function with ID **sikau-neural-speech** and root **functions/neural-speech**, entrypoint **src/main.js**.
3. **Execute permissions: signed-in Users only.** Do not enable `Any`, a public domain, or request/response-body logs. Timeout at least 20 seconds. Keep execution responses private.
4. Configure private function environment variables:
   - **Gemini (no Azure required):** `GEMINI_API_KEY` and `SPEECH_PROVIDER=gemini`. Uses Google AI Studio model `gemini-3.8-flash-tts` by default, female voice **Kore**, male voice **Charon**. Optionally set `GEMINI_TTS_MODEL=gemini-3.8-flash-lite-tts` to lower usage cost and latency, or `gemini-2.5-flash-preview-tts` for compatibility. Both 3.8 models produce ready-to-play WAV audio; never wrap a second RIFF header. Test Nepali pronunciation with native speakers before public release.
   - **Azure:** `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`, and optionally `SPEECH_PROVIDER=azure`. Choose your Speech region such as `eastus`.
   - Never publish keys to GitHub or pass keys into public JavaScript.
5. Deploy the function, verify a paid test account and trial account can call it and an unauthenticated account cannot. Check the browser/iOS audio unlock.
6. **Only after successful deployment**, switch `speechAI:null` to `speechAI:'sikau-neural-speech'` in public `index.html`. Until then, the app retains its browser-voice fallback.
7. Test both languages/genders. With Azure: **ne-NP-HemkalaNeural**, **ne-NP-SagarNeural**, **en-US-AvaNeural**, **en-US-AndrewNeural**. With Gemini: **Kore** (female) and **Charon** (male); pronunciation and grammatical faithfulness should be checked with native Nepali speakers. Test Reading and Translate, an existing male/female switch, active memberships, free-tier 429 errors, multiple sentences, iPhone Safari and macOS Safari.
8. Inform learners that speech synthesis sends the selected text to the configured provider (Google or Microsoft). Free Gemini API data may be used to improve Google's products; do not enter private information in listening exercises.

The backend verifies the signed-in user's Appwrite JWT and paid/trial entitlement. It rejects requests over 550 characters and bursts over 12 requests/minute per warm instance. **The in-memory counter is not a durable global quota**; add a shared per-account quota with Appwrite TablesDB before broad release. Speech usage is subject to provider quotas and charges beyond any free allowance. No student audio or text is stored by the function.

## Speech-quality audit checklist (October 2026)

- **Never advertise human-quality voice as active until the provider works.** By default `speechAI:null` means Web Speech device audio is still used and may sound robotic on Safari.
- **Naturalness:** Compare English and Nepali male/female with the same three short scripts on iPhone Safari, macOS Safari, and Windows Edge. Check whether the provider's language pronunciation is genuinely Nepali rather than Hindi-accented.
- **Test sentences:** `I only have seven hundred and forty-five rupees.`, `मसँग सात सय पैंतालीस रुपैयाँ मात्रै छ।`, and `भोलि पोखरा जाने योजना छ।`.
- **Style:** For Gemini 3.8, keep the **exact transcript** in `contents[].parts[].text` and put pacing, warmth, natural accent, and expression in `speech_metadata.style` (not in text to be spoken).
- **Long readings:** The website splits larger Reading passages into sentence-based segments of at most about 400 characters with next-chunk prefetch. Provider quotas and buffering can still introduce pauses; consider caching repeated lesson scripts in a private datastore if terms allow.
- **Real provider test:** Call the function with an authenticated test account and confirm a valid audio waveform, not just a returned model name. Verify Apple audio playback and the male/female toggle separately. The repository's automated tests mock provider responses and are not acoustic listening tests.
- **Privacy:** Google API free-tier prompts may be used to improve Google's products. Do not send personal learner messages to TTS by default without a disclosure and acceptance mechanism. This function is for listening to learning material the learner selects.
- **Costs:** Both Gemini 3.8 Flash TTS and Flash-Lite TTS show a limited free tier as of October 2026. Limits, availability, pricing and data terms may change; set a server-side global per-user quota before production use.

Official docs: https://ai.google.dev/gemini-api/docs/speech-generation and https://ai.google.dev/gemini-api/docs/pricing and https://learn.microsoft.com/azure/ai-services/speech-service/language-support
