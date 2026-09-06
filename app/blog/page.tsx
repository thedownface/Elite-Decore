import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageHero } from '@/components/layout/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { FadeIn } from '@/components/ui/FadeIn'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { POSTS } from '@/lib/data/posts'
import { formatDate } from '@/lib/utils'
import { SITE } from '@/lib/data/site'

export const metadata: Metadata = createMetadata({
  title: 'Journal',
  description:
    'Notes from the studio on material, light and practice — written by the people who specify, detail and build.',
  path: '/blog',
  keywords: ['interior design journal', 'material notes', 'design practice India'],
})

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `${SITE.name} Journal`,
  url: `${SITE.url}/blog`,
  blogPost: POSTS.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.date,
  })),
}

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/blog' },
        ])}
      />
      <JsonLd data={blogJsonLd} />

      <PageHero
        eyebrow="The Journal"
        title="Notes from the drawing table."
        description="Occasional writing on material, light and the parts of practice that rarely make it into a portfolio."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Journal', href: '/blog' },
        ]}
      />

      <section className="bg-paper py-20 md:py-24" aria-label="Journal entries">
        <div className="container-luxe">
          <ul className="flex flex-col">
            {POSTS.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.08}>
                <li className="group border-b border-ink/10 first:border-t">
                  <Link
                    href={`/blog/${post.slug}`}
                    data-cursor="link"
                    className="grid items-center gap-8 py-10 md:grid-cols-12"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-arch md:col-span-4 md:aspect-[4/3]">
                      <Image
                        src={post.cover}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        loading={i === 0 ? undefined : 'lazy'}
                        priority={i === 0}
                        className="object-cover transition-transform [transition-duration:1400ms] ease-expo group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col gap-4 md:col-span-8">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.62rem] uppercase tracking-luxe text-ink/60">
                        <span className="text-gold-700">{post.category}</span>
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>{post.readTime} read</span>
                      </div>

                      <h2 className="max-w-2xl font-display text-fluid-xl font-semibold leading-tight tracking-tightest text-ink transition-colors duration-500 group-hover:text-gold-800">
                        {post.title}
                      </h2>

                      <p className="max-w-2xl text-fluid-base font-normal leading-relaxed text-ink/60">
                        {post.excerpt}
                      </p>

                      <span className="mt-2 text-[0.64rem] uppercase tracking-luxe text-ink/65 transition-colors duration-500 group-hover:text-gold-700">
                        Read the piece →
                      </span>
                    </div>
                  </Link>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
