'use client'

import { TESTIMONIALS } from '@/lib/data/testimonials'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Marquee } from '@/components/ui/Marquee'
import { FadeIn } from '@/components/ui/FadeIn'

function QuoteCard({ quote, author, role, location }: (typeof TESTIMONIALS)[number]) {
  return (
    <figure className="mx-3 flex h-full w-[320px] flex-col justify-between gap-7 rounded-arch border border-ink/10 bg-paper-pure p-7 shadow-soft transition-all duration-700 ease-expo hover:-translate-y-2 hover:shadow-card sm:w-[400px] sm:p-9">
      <span aria-hidden className="font-display text-5xl leading-none text-gold-700">
        &ldquo;
      </span>

      <blockquote className="text-fluid-base font-normal leading-relaxed text-ink/80">
        {quote}
      </blockquote>

      <figcaption className="flex flex-col gap-1 border-t border-ink/12 pt-5">
        <span className="font-display text-lg font-semibold text-ink">{author}</span>
        <span className="text-[0.62rem] uppercase tracking-luxe text-ink/65">{role}</span>
        <span className="text-[0.62rem] uppercase tracking-luxe text-gold-700">
          {location}
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2)

  return (
    <section
      className="relative overflow-hidden bg-paper-soft py-24 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent"
      />

      <div className="container-luxe">
        <SectionHeading
          eyebrow="Client Voices"
          title="The measure of a studio is what clients say two years later."
          align="center"
          as="h2"
          className="max-w-4xl"
        />
        <h2 id="testimonials-heading" className="sr-only">
          Client testimonials
        </h2>
      </div>

      <FadeIn delay={0.1} className="mt-16 flex flex-col gap-6">
        <Marquee speed={58}>
          {TESTIMONIALS.slice(0, half).map((t) => (
            <QuoteCard key={t.author} {...t} />
          ))}
        </Marquee>

        <Marquee speed={68} reverse>
          {TESTIMONIALS.slice(half).map((t) => (
            <QuoteCard key={t.author} {...t} />
          ))}
        </Marquee>
      </FadeIn>

      <FadeIn delay={0.2} className="container-luxe mt-16">
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 border-t border-ink/10 pt-10 text-[0.64rem] uppercase tracking-luxe text-ink/60">
          {[
            'Featured in Architectural Digest India',
            'Elle Decor Design Award 2024',
            'IIID Excellence, Residential',
            'Good Homes Studio of the Year',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}
