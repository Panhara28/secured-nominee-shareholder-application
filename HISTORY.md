# Project History

Running log of setup, testing, and notable changes made in this project via Claude Code.
Newest entries first. Keep entries short and factual.

## 2026-08-16 (round 2 - full admin module sweep)
- Deep browser E2E test of every remaining admin/portal module: Reports (filters + Excel export), Activities Log, Diff & Compare, Internal Users, Roles & Permission (RBAC), forgot/reset-password, Khmer i18n switch.
- **Bug fixed (significant, API-side)**: Diff & Compare and the request-detail "Edit History" panel were both empty for any unapproved edit/resubmission — the underlying query only showed revisions of *already-approved* requests, making the whole feature useless for its main purpose. Fixed in the API repo (`revisions.service.ts`, `beneficiary-requests.service.ts`) — see that repo's `HISTORY.md` for details. Verified here: a RETURNED→edited→resubmitted request's field-by-field diff now renders correctly in both places immediately after resubmission.
- Created a test "Reviewer" role (Requests read/update only) via Role & Permission, created an Internal User with it, and confirmed the backend actually enforces it (403 on unauthorized endpoints, 200 on granted ones). Noted as a UX gap (not fixed): the admin sidebar shows all modules regardless of the logged-in user's permissions, and unauthorized pages show a generic "Failed to load" error rather than a clear permission-denied message.
- Confirmed working correctly: Reports filters/stats/Excel export, Internal User creation, Role creation + permission toggling, forgot-password → reset-password flow (dev mode shows the reset link directly, no email service configured locally), Khmer locale (`/km/...`) translates the full UI correctly.
- Noted, not a bug: document/photo uploads in the beneficiary request wizard don't persist to real storage in this build — the "ID Card / Passport Copy" etc. fields on a submitted request show "-" (filenames are demo-only, per an existing comment in the proxy code), so there's nothing to download yet.

## 2026-08-16 (round 1 - core flow test + fixes)
- Deep browser E2E test (Claude-in-Chrome) of the full flow: portal registration (autofill demo data) → admin user-approval (Verify/Return/Reject) → beneficiary request wizard (autofill, all 4 steps, real file-upload UI) → Save Drafted vs Submit Request → admin Verify/Approve → confirmed request status, activity log, and a "Download Letter Attesting..." certificate button all appear correctly for an approved request.
- Local `API_BASE_URL` moved from `:8080` to `:8081` in `.env.local` (see API repo's history — unrelated container was on 8080).
- **Bug fixed**: rejecting a shareholder registration (`components/admin/AdminUserDetail.tsx`) was a single click with zero confirmation and no reason captured — the account is deleted permanently. Added a confirm dialog (mirrors the existing Return dialog) requiring a reason, matching the pattern already used for beneficiary-request rejection (`AdminRequestDetail.tsx`).
- Confirmed working correctly (no changes needed): the beneficiary-request Verify → Approve/Return/Reject flow, the RETURNED→edit→resubmit flow, and realtime SSE toast notifications for both the admin bell and portal bell (after fixing the corresponding gap in the API — see that repo's `HISTORY.md`).
- Observed but not fixed (lower priority): with multiple tabs/SSE connections open simultaneously during local dev testing, a shareholder's own request-detail page occasionally shows stale content even though toast notifications keep arriving live — a manual refresh always shows correct data. Suspected browser/dev-server connection-limit artifact (HTTP/1.1 6-connections-per-origin cap), not confirmed to reproduce on UAT (which should serve over HTTP/2).
- Also noted: registration/request-wizard demo autofill occasionally didn't visibly populate on the very first click after a fresh page navigation (needed a second click) — cosmetic/timing, not investigated further.

## 2026-08-16
- Installed dependencies (`npm install`); generated Prisma client (`npx prisma generate`).
- Created `.env.local` with `DATABASE_URL`, `SESSION_SECRET`, `COOKIE_SECURE=false`, `API_BASE_URL=http://localhost:8080`.
- `DATABASE_URL` points at MySQL on `localhost:3306`, database `secured_nominee_shareholder_app` (separate DB from the API project — different Prisma schema).
- Applied Prisma migrations (`npx prisma migrate deploy`) — `20260813075126_init`; database created.
- Seeded fake data (`prisma/seed.ts`): 2 users —
  - `admin` / `admin123` (admin, Super Admin role)
  - `sok.dara` / `password123` (shareholder)
- Started dev server (`npm run dev`, Turbopack) — ready on http://localhost:3000.
- Verified in browser: login page (`/en/portal/login`) renders correctly with Ministry of Commerce branding.
