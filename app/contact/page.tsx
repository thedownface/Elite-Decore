import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { FadeIn } from '@/components/ui/FadeIn'
import { RevealText } from '@/components/ui/RevealText'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/data/site'

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description:
    'Book a consultation with Elite Decore. Studio on Kodigehalli Road, Bangalore — projects across Bangalore and Karnataka.',
  path: '/contact',
  keywords: ['interior design consultation', 'contact interior designer Bangalore'],
})

const CONTACT_POINTS = [
  { label: 'New projects', value: SITE.email, href: `mailto:${SITE.email}` },
  { label: 'Studio line', value: SITE.phone, href: `tel:${SITE.phoneHref}` },
  {
    label: 'WhatsApp',
    value: SITE.phone,
    href: `https://wa.me/${SITE.whatsappHref}?text=${encodeURIComponent(
      "Hi Elite Decore, I'd like to talk about an interior project.",
    )}`,
  },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <PageHero
        eyebrow="Book a Consultation"
        title="Tell us about the space."
        description="The first conversation is free, lasts about an hour, and is genuinely useful whether or not you go on to appoint us. Bring a floor plan if you have one."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      <section className="bg-paper pb-24 pt-8 md:pb-32" aria-labelledby="enquiry-heading">
        <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="enquiry-heading" className="sr-only">
              Project enquiry
            </h2>
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-12 lg:col-span-5 lg:pl-10">
            <FadeIn>
              <div className="glass flex flex-col gap-5 rounded-arch p-8">
                <span className="eyebrow">The Studio</span>
                <address className="text-fluid-base font-normal not-italic leading-relaxed text-ink/80">
                  {SITE.address.street}
                  <br />
                  {SITE.address.district}, {SITE.address.city}
                  <br />
                  {SITE.address.region} {SITE.address.postalCode}
                  <br />
                  {SITE.address.countryName}
                </address>
                <p className="text-[0.64rem] uppercase tracking-luxe text-gold-700">
                  {SITE.hours}
                </p>
                <a
                  href="https://maps.google.com/?q=Muninanjappa+Layout+Kodigehalli+Road+Bangalore+560048"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="link"
                  className="link-underline w-fit text-sm text-ink/75"
                >
                  Open in Maps ↗
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <dl className="flex flex-col">
                {CONTACT_POINTS.map((point) => (
                  <div
                    key={point.label}
                    className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-5 first:border-t"
                  >
                    <dt className="text-[0.62rem] uppercase tracking-luxe text-ink/65">
                      {point.label}
                    </dt>
                    <dd>
                      <a
                        href={point.href}
                        target={point.href.startsWith('https') ? '_blank' : undefined}
                        rel={point.href.startsWith('https') ? 'noreferrer noopener' : undefined}
                        data-cursor="link"
                        className="link-underline text-sm text-ink/80"
                      >
                        {point.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col gap-5">
                <span className="eyebrow">Follow</span>
                <div className="flex flex-wrap gap-3">
                  {SITE.socials.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="link"
                      className="rounded-pill border border-ink/12 px-5 py-2 text-[0.62rem] uppercase tracking-luxe text-ink/60 transition-all duration-500 ease-expo hover:border-gold-600 hover:text-gold-700"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <RevealText
                as="p"
                className="border-t border-ink/10 pt-8 font-display text-fluid-lg font-semibold leading-snug text-ink/75"
              >
                We keep our intake deliberately small. If we are not the right studio for yours, we will say so in the first conversation.
              </RevealText>
            </FadeIn>
          </aside>
        </div>
      </section>
    </>
  )
}
