/**
 * Web3Forms submission — every form on the site (enquiry form, newsletter)
 * posts here. No backend of our own: this is a fully static site, and
 * Web3Forms' access key is a public site key by design (safe to ship
 * client-side), not a secret.
 *
 * Override via NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY if the key is ever rotated;
 * otherwise this default is used.
 */
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '6b753ea1-8898-43cf-a870-6a26177c0fe3'

export class Web3FormsError extends Error {}

/**
 * Submits a payload as JSON (Web3Forms' AJAX path — no page navigation, a
 * plain {success, message} response). `botcheck` is Web3Forms' documented
 * honeypot: a hidden, always-empty field real visitors never fill in.
 */
export async function submitToWeb3Forms(
  payload: Record<string, string> & { subject: string; from_name: string },
) {
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      ...payload,
    }),
  })

  let data: { success?: boolean; message?: string } = {}
  try {
    data = await res.json()
  } catch {
    // Non-JSON response — fall through to the generic error below.
  }

  if (!res.ok || !data.success) {
    throw new Web3FormsError(data.message || 'Submission failed. Please try again.')
  }

  return data
}
