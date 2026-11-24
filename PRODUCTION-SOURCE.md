# English Sikau — original production site source layout

The original URL and all original features remain in place. No new version or sample curriculum is exposed. The outer application stylesheet and classic runtime are extracted verbatim, except the recovery URL cleanup is moved before external assets to retain credentials in memory. The browser loads the same scripts in the same order; the main script is classic, not deferred or converted to a module. The Appwrite-protected classroom continues to be retrieved and authorized using the existing backend.

- index.html: browser document and account markup.
- sikau-shell.css: original account and outer-shell CSS.
- sikau-runtime.js: original account, access, integration and classroom runtime.
- src/header-language.ts: typed header language source.
- header-language.js: browser-ready header language implementation.
- src/mobile-bar-handles.ts: typed navigation source, pending compiled parity validation.

Do not publish private Appwrite course content or credentials. Future TypeScript migration must preserve existing behavior and be tested with a verified account, including trial, payment, password reset, progress, audio, all tabs and iPhone/desktop layouts. Extraction is a structural refactor, not a claim of full TypeScript conversion.
