# Owner Nepali voice (Swar) — private, opt-in, not yet activated

English Sikau can use the owner's Nepali voice for **all Nepali spoken text** in the shared Translate/Reading speech bridge, regardless of the existing female/male selection. **English remains on the existing browser voice path**. No clone model or speaker audio is committed here.

## Current deployment status

- The GitHub Pages repository contains only integration code. **It does not contain a trained or enrolled voice, GPU inference server, or the owner's recording.**
- The public `CFG.speechAI` remains `null` and `CFG.ownerNepaliVoice` remains `false`. This is intentional: the live app continues to use existing voices until real private generation is verified.
- The user recording is private and must never be committed to this public GitHub repository or hosted as a publicly downloadable URL.
- Swar by Naamche Labs is open-source Nepali voice cloning; its code/model licenses and attribution obligations must be reviewed before production distribution. Source: https://github.com/Naamche-Labs/swar
- The published free Google Colab notebook is suitable for an **interactive proof of concept** and limited generation tests, NOT an unattended 24/7 HTTPS audio API with guaranteed uptime or unlimited compute. A reliable public app requires a separately operated inference service; this may have hosting costs.

## Private inference contract

An owner-controlled **HTTPS service with GPU access** must run Swar with the owner's enrolled, consented voice. The service MUST require a secret bearer token, MUST reject anonymous requests, MUST enforce a quota, MUST reject oversized/unsafe text, and MUST never return speaker recordings or model checkpoints to clients.

The Appwrite function makes:
- `POST` to the privately configured `SWAR_TTS_URL`
- Headers: `Authorization: Bearer <SWAR_TTS_TOKEN>`, `Content-Type: application/json`, `Accept: audio/wav, audio/mpeg`
- Request JSON: `{"text":"नमस्कार, तपाईंलाई कस्तो छ?"}`
- Successful response: raw WAV (`audio/wav`) or MP3 (`audio/mpeg`) **bytes**. The adapter does not accept arbitrary JSON/Base64 from the inference service.
- Timeout 20 seconds, response limited to 1.4 MB. A non-2xx, invalid MIME, invalid audio signature, or overlarge response yields a generic 503 to the learner; never expose credentials.

The project's existing Appwrite function handles authentication, paid/trial entitlement checks and a warm-instance rate limit. Its warm-instance limiter is **NOT a durable global rate limit**. Enforce a durable per-account and global quota before broad public use to avoid exhausting GPU capacity.

## Deployment checklist (must be completed before turning on)

1. Test the owner's private 20–30-second Nepali recording in the official [Swar Google Colab notebook](https://colab.research.google.com/github/Naamche-Labs/swar/blob/main/notebooks/Swar_Clone_Colab.ipynb). Confirm it actually speaks **previously unseen Nepali sentences** with a recognizable accent and acceptable pronunciation.
2. Privately enroll that approved recording in the Swar inference service. The recording and voice artifacts stay off public GitHub. Keep storage access restricted and delete excess copies when no longer necessary.
3. Deploy and smoke-test a token-protected HTTPS endpoint honoring the contract above. Verify no anonymous request can generate speech, validate output length and audio type, and add a GPU usage cap. Neither Colab nor GitHub Pages alone meets this requirement.
4. Deploy the existing Appwrite Node speech function `functions/neural-speech/src/main.js` in the Frankfurt Appwrite project with ID `sikau-neural-speech`. Execute permission: signed-in Users only. **Private** function environment:
   - `SPEECH_PROVIDER=swar`
   - `SWAR_TTS_URL=https://<private-host>/synthesize`
   - `SWAR_TTS_TOKEN=<long-random-secret>`
   Ensure host and Appwrite token remain private and logs do not include voice or prompt contents.
5. Test the Appwrite function with an authorized account and both `gender: "female"` and `gender: "male"` for `lang: "ne-NP"`. They should produce the SAME owner voice. A request for `lang: "en-US"` is refused by this provider and should remain on existing native English speech in the browser.
6. **Only after successfully hearing genuine cloned Nepali speech**, edit public `index.html` to set:
   - `speechAI:'sikau-neural-speech'`
   - `ownerNepaliVoice:true`
7. Test Translate, Reading/Practice and any other tab which uses the shared Web Speech bridge on Windows, iOS Safari and Android Chrome. Confirm a 503 gives a visible retry/unavailable message, not a false "your voice is active" announcement; confirm no silent female voice substitution.
8. Verify startup and cold-start delays, overquota behavior, feature disable/revert and audio continuity for multi-sentence paragraphs. Record a data-use notice for learners before their selected text is sent to a private inference provider.

## What the integration can and cannot guarantee

- One server-generated audio voice is consistent across Windows, Apple and Android browsers, because they replay identical WAV/MP3 bytes rather than selecting different OS speech voices.
- The shared bridge intercepts Web Speech utterances in protected lesson content. Other playback mechanisms (direct `Audio` files or external speech services) need separate explicit integration; **do not claim all app paths were verified** until cross-device tests are done.
- The voice model **cannot** generate new speech for everyone at $0 without an available compute host. Open-source weights are not free, unlimited hosting.
- The owner can disable voice cloning at any time by resetting `speechAI:null` and `ownerNepaliVoice:false`; original English and existing Nepali fallback paths remain untouched.
