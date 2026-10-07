/**
 * Central registration switch for IoSC Website.
 *
 * NOTE FOR FUTURE AGENTS / CONTRIBUTORS:
 * - Registrations are currently CLOSED (`REGISTRATIONS_OPEN = false`).
 * - To REOPEN: set `REGISTRATIONS_OPEN = true` (or set env
 *   `NEXT_PUBLIC_REGISTRATIONS_OPEN=true` and redeploy). All register
 *   buttons, the auto-popup (`XpNotificationPopup`), and the `JoinForm`
 *   modals in `app/page.tsx` are gated behind `isRegistrationsOpen()`.
 * - To CLOSE again: set it back to `false`. Do NOT delete `JoinForm`,
 *   `lib/api.ts:submitApplication`, or the modal shells — they are kept
 *   intact so reopening is a one-line change.
 * - Backend `POST /api/v1/applications` is intentionally left unblocked
 *   (frontend-only close). If a hard close is ever needed, add a 403 guard
 *   in `backend/src/services/application.service.ts` or routes.
 */

export const REGISTRATIONS_OPEN: boolean =
  process.env.NEXT_PUBLIC_REGISTRATIONS_OPEN === "true" ? true : false;

export function isRegistrationsOpen(): boolean {
  return REGISTRATIONS_OPEN;
}

export const REGISTRATION_CLOSED_NOTICE =
  "Team Selection 2026 applications are now closed.";
