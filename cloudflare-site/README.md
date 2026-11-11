# English Sikau — free Cloudflare Pages address

This directory isolates the Cloudflare Pages project from the repository's
Appwrite server `functions/` directory. Do **not** choose the repository root
as the Cloudflare Pages root: otherwise Cloudflare may treat Appwrite code as
Cloudflare Pages Functions.

## One-time account setup

1. Sign in or create a **free** Cloudflare account at https://dash.cloudflare.com/.
2. Open **Workers & Pages → Create application → Pages → Connect to Git**.
3. Authorize GitHub and select **abhyash-shrestha/English-Sikau**.
4. Choose the project name `englishsikau`, if available. This gives a
   potential URL of `https://englishsikau.pages.dev/`. Cloudflare assigns
   the actual URL; availability is not guaranteed in advance.
5. Set **Production branch** to `main` and **Framework preset** to `None`.
6. Expand **Root directory (advanced)** and set **Path** to `cloudflare-site`.
7. Set **Build command** to `node ../scripts/build-cloudflare-pages.mjs`.
8. Set **Build output directory** to `dist`.
9. Select **Save and Deploy**. Let Cloudflare confirm the actual site URL.

Cloudflare will redeploy from `main` when GitHub changes are pushed.

## Required Appwrite configuration before inviting learners

After obtaining the exact `*.pages.dev` hostname, open your **existing**
Appwrite project → **Overview / Platforms → Add platform → Web** and register
the new hostname (without `https://` or a path). Keep the existing GitHub
Pages hostname registered as well so the current site keeps working.

Test sign-up, sign-in, trial/paid entitlement, protected classroom, reading,
Coach, the U.S. Visa Interview tab, audio, writing, and password-reset email
links on the new address before sharing it or replacing old QR codes.
Appwrite account data remains on Appwrite; browser-specific local preferences
and sessions may not carry over to a different site origin.

## Important

- Never add an Appwrite API key or Cloudflare token to public GitHub files.
- This setup does **not** buy or register `englishsikau.com`; it uses the
  free `pages.dev` subdomain.
- GitHub Pages remains active. Do not change its CNAME or domain settings.
- Only site HTML, JS, CSS and public `assets/` are published. The Appwrite
  backend and test source stay out of the Cloudflare Pages build output.

Run `node scripts/build-cloudflare-pages.mjs` from the repository root to
generate the public site locally, and run the dedicated regression test with
`node --test test/cloudflare-pages-build.test.mjs`.
