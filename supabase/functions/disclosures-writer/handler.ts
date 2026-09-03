// disclosures-writer — the SHAPE of the model call, and nothing more (AS-Q1).
//
// Michael ruled WHERE the call runs: "Yes — server-side function + secret;
// fixture writer only now; note CLAUDE.md". A browser app cannot hold a vendor
// key, so the call belongs in a server-side function holding the credential as
// a Supabase secret — the LEGISCAN_API_KEY pattern, and this app's first
// server-side identity.
//
// ⚠ THIS FUNCTION CALLS NO VENDOR. There is no SDK, no endpoint, no model name
// and no vendor key name in this file or anywhere near it. It authenticates the
// caller, looks for ONE VENDOR-NEUTRAL SECRET, and REFUSES when it is absent —
// which it always is, in every environment this slice ships (D-38).
//
// H12-v is Michael's ruling to make: "they obviously need to wait on that so I
// can figure that out." NO REAL RECORD MOVES THROUGH THIS PATH UNTIL A BAA IS
// SIGNED (REQ-CAPTURE §16.3).
//
// This file is DELIBERATELY free of Deno globals so the refusal is unit-testable
// from vitest — §7.5 asks for exactly that, and a refusal nobody can test is a
// refusal nobody has checked. `index.ts` beside it is the Deno entry point and
// is the only file here that touches the runtime.

/** The ONLY credential slot this slice may carry (D-38). Vendor-NEUTRAL by
 *  design: naming a vendor here would imply a choice Michael has not made. */
export const CREDENTIAL_SECRET_NAME = 'DISCLOSURES_WRITER_CREDENTIAL';

export interface HandlerEnv {
  /** The value of CREDENTIAL_SECRET_NAME, or undefined when it is not set —
   *  which is its state in every environment this slice ships. */
  credential?: string;
  /** The caller's `Authorization` header, if any. */
  authorization?: string;
}

export interface HandlerResult {
  status: number;
  body: { error?: string; detail?: string };
}

/**
 * The whole behaviour of this function in this slice, as a pure function.
 *
 * Order matters and is deliberate: AUTHENTICATE FIRST. A function that reported
 * "not configured" to an unauthenticated caller would be telling the world
 * about the firm's server-side configuration, which is a small leak but a free
 * one to avoid.
 */
export function handleDisclosuresWriter(env: HandlerEnv): HandlerResult {
  const auth = (env.authorization ?? '').trim();
  if (!auth.toLowerCase().startsWith('bearer ') || auth.length <= 'bearer '.length) {
    return {
      status: 401,
      body: { error: 'Not authenticated.' },
    };
  }

  if (!env.credential || env.credential.trim() === '') {
    return {
      status: 503,
      body: {
        error: 'The disclosures writer is not configured.',
        detail:
          `No ${CREDENTIAL_SECRET_NAME} is set for this project, so this function has no writer `
          + 'to call. That is the expected state: the app ships with a fixture writer, and no '
          + 'real record may be processed through a model until the vendor is chosen and a '
          + 'business associate agreement is signed. Nothing was transmitted.',
      },
    };
  }

  // Configured — but there is still nothing to call, and saying so plainly is
  // better than pretending. The vendor arrives with H12-v, in one place.
  return {
    status: 501,
    body: {
      error: 'No writer implementation is wired.',
      detail:
        'A credential is present but this build carries no vendor adapter. Wiring one is a '
        + 'separate, authorized change; until then the fixture writer is the only writer. '
        + 'Nothing was transmitted.',
    },
  };
}
