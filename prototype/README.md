# Twilight Sanctuary · Garden Shell v0.1

This is an isolated static prototype for Digital Garden Task 002. It has no production deployment configuration, production credentials, network service adapters or production database access.

From the repository root, serve the prototype with `python -m http.server 4173 --bind 127.0.0.1 --directory prototype` and open http://127.0.0.1:4173/. Use a static HTTP preview so the browser can load the ES modules. Run deterministic checks with `node --test prototype/tests/*.test.mjs`. For a Chromium acceptance run, install Python Playwright with a Chromium browser, then run `python prototype/tests/browser_test.py --screenshots /path/to/output`.

The shell uses the approved color tokens and separately generated sanctuary and Sol artwork for this prototype. The supplied Task 002B sanctuary artwork and Sol sprite are independent WebP layers. The sprite uses the matching source alpha matte to preserve its rim lighting and contours. It does not establish additional canon.

Daily Journal dates, quest progress, XP and Gald are synthetic. The single currency display uses Gald. The check-in and reply draft stay in tab memory and reset on reload. Sol's three choices are scripted. All integration routes show their unavailable states. Companion Vault excludes editing and authenticated connections in this milestone.

The preview/test directory is an isolated development deliverable. It has no debug controls or production release entry point. Keep its fixtures, preview adapter and browser tests outside any future production deployment. The managed Solmon Site remains the authoritative operational application.
