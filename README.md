# PGW ImplementAI 2026 — Conference Webapp

Phone-first webapp (add-to-home PWA) for PGW's National Conference, 29 Oct 2026, Hobart.
Scope + design live in `Squad/PGW/` (SCOPE.md, brand guide, approved mocks). This repo is code only.

## Architecture — zero-toolchain by constraint

**No Node.js on this machine (work admin policy, 2026-07-21).** The app is therefore
**no-build static**: plain HTML + CSS + ES-module JavaScript. Nothing to install,
nothing to compile. What's in this folder is exactly what ships.

- `index.html` — the shell (one page, hash-routed tabs)
- `css/styles.css` — design tokens + components, from the locked PGW brand DNA
- `js/` — `data.js` (content shapes the Firebase admin will fill), `views.js`,
  `app.js` (router), `store.js` (phone-local starring), `icons.js`
- `tools/serve.ps1` — pure-PowerShell preview server (no installs).
  `pwsh -File tools\serve.ps1` → http://localhost:8080. Add `-Lan` for phone-on-wifi preview.

**Later phases:** Firebase (Q&A + content) loads via its browser CDN `<script>` —
still no local toolchain. Deploy = upload these files (Firebase Hosting / Netlify /
any static host), or a GitHub Action does it in the cloud on push.

## Design reference

Built to `Squad/PGW/brand/moodboard/attendee-home-v3-APPROVED-2026-07-21.png`
(approved by JS + PGW, 21 Jul 2026). Fonts are stand-ins: Poppins ≈ Nexa,
JetBrains Mono for mono labels — production swaps to licensed Nexa.
