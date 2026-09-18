import { whatsappUrl, WHATSAPP_GREETING } from '@/lib/whatsapp'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

/**
 * Fixed floating WhatsApp entry point, present on every page. Opens a chat
 * with the studio's own number and a pre-filled enquiry line.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl(WHATSAPP_GREETING)}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="link"
      aria-label="Chat with Elite Decore on WhatsApp"
      className="group fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-500 ease-expo hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 group-hover:opacity-0" aria-hidden />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  )
}
