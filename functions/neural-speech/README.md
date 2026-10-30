# Bilingual listening and speech input

The production site currently uses device voices. `CFG.speechAI:null` means the optional Appwrite speech service is disabled. Publishing GitHub changes does **not** deploy an Appwrite Function, configure a provider, install device voices, or add languages to Safari.

## What works without a provider

- One American English (`en-US`) voice and one Nepal Nepali (`ne-NP`) voice, chosen from the device catalog. Hindi and British English are not substituted.
- Delayed Android voice catalogs, short segments for long readings, ordered playback, preserved slow-practice speed, Stop, and cancellation on navigation.
- A visible Play action when Safari requires another user gesture.
- Speech input collects the latest recognition snapshot and commits one transcript when a session ends. It does not repeatedly append interim/final callbacks. Repeated words inside a sentence remain intact.
- Microphone cancellation and permission/service errors release the session. iPhone English guesses are not presented as successful Nepali transcription.

Device voice quality and language availability remain device-dependent. Automated tests simulate browser events; they do not establish acoustic naturalness or test a physical microphone.

## Enable the optional service

Use the existing Appwrite Frankfurt project. Create/deploy a Node.js Function from `functions/neural-speech`, entrypoint `src/main.js`.

1. Allow execution for authenticated Users only. The function also checks verified accounts and existing membership or an active trial. Keep request/response-body logging and public function domains disabled.
2. Configure only the required provider in private Appwrite environment variables:
   - Natural listening: `AZURE_SPEECH_KEY` plus `AZURE_SPEECH_REGION`, or `GEMINI_API_KEY` plus `SPEECH_PROVIDER=gemini`. The current Gemini model choices are defined in source.
   - Recorded speech input: `GROQ_API_KEY` plus `SPEECH_TRANSCRIPTION_ENABLED=1`. A Groq key alone does not activate recording uploads.
3. Test an authenticated `{ "action": "capabilities" }` request. It must return `status:ok` and the appropriate `tts`/`transcription` readiness flags, without any keys.
4. Test real English and Nepali waveforms, pronunciation, and recognition using a permitted test account. The UI requests one voice per language, with no gender selector.
5. Only after the deployed function passes those checks, set the public `CFG.speechAI` to that function's ID. The frontend checks capabilities within the verified lesson session. It discards responses after logout or an account/session change.
6. Confirm the existing provider account remains within the owner's intended allowance; do not enable paid upgrades automatically. The per-instance burst guard is not a durable, global spending quota.

### Recorded speech on iPhone

When transcription is enabled, Nepali on iPhone/iPad uses MediaRecorder and the authenticated backend rather than Safari's native Nepali recognizer. MP4 is selected when supported; Android can use WebM/Opus. The learner starts and stops the recording explicitly; it ends automatically after 20 seconds. Microphone tracks are stopped before upload. The recording is limited to 1.2 MB.

The backend sends the recording to Groq's `audio/transcriptions` endpoint with language `ne` or `en`, preserving the original language. It validates membership, MIME/container signature, size, and returned duration. It does not store recordings. The interface tells the learner that recorded audio is sent for transcription.

Natural listening sends the selected lesson text to the configured speech provider. Provider data-use terms and quotas apply. Keep all provider keys server-side.

## Verification

```sh
node --test test/nepali-voice-bridge.test.mjs test/neural-speech-function.test.mjs test/speech-input.test.mjs test/speech-transcription-function.test.mjs
```

Before claiming cross-device completion, test physical iPhone Safari, macOS Safari, Android Chrome, and Windows Edge: English and Nepali, delayed voice loading, long readings, denied permission then retry, Stop, tab changes, backgrounding, and repeated taps. Verify Nepali pronunciation with a native speaker. Check Safari's Play action after an asynchronous speech request.

Official references:
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent/results
- https://console.groq.com/docs/speech-to-text
- https://learn.microsoft.com/azure/ai-services/speech-service/language-support
- https://ai.google.dev/gemini-api/docs/speech-generation

