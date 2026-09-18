import { SITE } from '@/lib/data/site'

/**
 * Every WhatsApp entry point on the site composes its link here, so the number
 * and the tone of the opening message live in one place.
 *
 * A `wa.me` link cannot *send* anything — it opens WhatsApp with the text
 * pre-filled and the visitor taps send themselves. That is the whole of what is
 * possible without the WhatsApp Business API, and it is why the enquiry form
 * still emails in parallel: an abandoned chat would otherwise lose the lead.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappHref}?text=${encodeURIComponent(message)}`
}

/** The generic opener — floating button, footer link, contact page. */
export const WHATSAPP_GREETING = `Hi Elite Decore, I'd like to talk about an interior project.`

/**
 * Booking CTAs. `context` names where the tap came from (a service tier, a
 * project page) so the first message already says what it is about.
 */
export function bookingMessage(context?: string): string {
  return context
    ? `Hi Elite Decore, I'd like to book a consultation about ${context}.`
    : `Hi Elite Decore, I'd like to book a consultation.`
}

export type EnquiryFields = {
  name: string
  email: string
  phone: string
  location?: string
  projectType: string
  budget: string
  message: string
}

/**
 * The enquiry form's message. Labelled lines rather than prose, because this
 * arrives in a chat window the studio reads on a phone — scannable beats
 * conversational, and every field the visitor filled in survives the hop.
 */
export function enquiryMessage(f: EnquiryFields): string {
  const lines = [
    'New enquiry — Elite Decore',
    '',
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    `Email: ${f.email}`,
  ]

  if (f.location) lines.push(`Location: ${f.location}`)

  lines.push(`Project: ${f.projectType}`, `Budget: ${f.budget}`, '', f.message)

  return lines.join('\n')
}
