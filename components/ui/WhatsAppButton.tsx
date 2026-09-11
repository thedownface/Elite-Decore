import { SITE } from '@/lib/data/site'

/**
 * Fixed floating WhatsApp entry point, present on every page. Opens a chat
 * with the studio's own number and a pre-filled enquiry line.
 */
export function WhatsAppButton() {
  const message = encodeURIComponent(`Hi Elite Decore, I'd like to talk about an interior project.`)
  const href = `https://wa.me/${SITE.whatsappHref}?text=${message}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="link"
      aria-label="Chat with Elite Decore on WhatsApp"
      className="group fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lift transition-transform duration-500 ease-expo hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 group-hover:opacity-0" aria-hidden />
      <svg
        viewBox="0 0 32 32"
        aria-hidden
        className="relative h-7 w-7 fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.258.593 4.417 1.716 6.316L3.2 28.8l6.65-1.68a12.73 12.73 0 0 0 6.154 1.567h.005c7.068 0 12.8-5.73 12.8-12.8 0-3.42-1.332-6.635-3.75-9.053a12.71 12.71 0 0 0-9.055-3.634zm0 23.42h-.004a10.6 10.6 0 0 1-5.404-1.48l-.388-.23-4.01 1.014 1.07-3.91-.253-.401a10.594 10.594 0 0 1-1.625-5.613c0-5.86 4.766-10.626 10.618-10.626a10.55 10.55 0 0 1 7.51 3.116 10.55 10.55 0 0 1 3.106 7.518c0 5.86-4.766 10.612-10.62 10.612zm5.822-7.95c-.319-.16-1.888-.932-2.181-1.038-.293-.107-.506-.16-.719.16-.213.32-.825 1.038-1.012 1.251-.187.213-.373.24-.692.08-.319-.16-1.347-.497-2.566-1.586-.949-.847-1.59-1.892-1.776-2.212-.187-.32-.02-.492.14-.652.144-.143.319-.373.479-.56.16-.187.213-.32.32-.533.106-.213.053-.4-.027-.56-.08-.16-.719-1.734-.985-2.374-.26-.624-.523-.54-.719-.55l-.612-.01a1.18 1.18 0 0 0-.852.4c-.293.32-1.118 1.093-1.118 2.665s1.144 3.09 1.304 3.303c.16.213 2.253 3.44 5.459 4.824.763.33 1.358.527 1.822.674.766.244 1.463.21 2.014.127.614-.092 1.888-.772 2.155-1.517.266-.746.266-1.386.186-1.518-.08-.133-.293-.213-.612-.373z" />
      </svg>
    </a>
  )
}
