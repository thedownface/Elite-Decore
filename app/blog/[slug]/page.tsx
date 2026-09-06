import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/layout/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { FadeIn } from '@/components/ui/FadeIn'
import { RevealText } from '@/components/ui/RevealText'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { POSTS, getPost } from '@/lib/data/posts'
import { formatDate } from '@/lib/utils'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    return createMetadata({
      title: 'Entry not found',
      description: 'This journal entry could not be found.',
      path: `/blog/${slug}`,
    })
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
    type: 'article',
    publishedTime: post.date,
    keywords: [post.category, 'interior design writing'],
  })
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const others = POSTS.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        image={post.cover}
        imageAlt=""
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Journal', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
        meta={[
          { label: 'Published', value: formatDate(post.date) },
          { label: 'Reading time', value: post.readTime },
        ]}
      />

      <article className="bg-paper py-24 md:py-32">
        <div className="container-luxe">
          <RevealText
            as="p"
            className="mx-auto max-w-3xl font-display text-fluid-xl font-semibold leading-[1.3] text-ink/90"
          >
            {post.excerpt}
          </RevealText>

          <FadeIn stagger={0.09} className="mx-auto mt-12 flex max-w-2xl flex-col gap-7">
            {post.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-fluid-base font-normal leading-[1.85] text-ink/70"
              >
                {paragraph}
              </p>
            ))}
          </FadeIn>

          <FadeIn delay={0.2} className="mx-auto mt-16 max-w-2xl border-t border-ink/10 pt-8">
            <p className="text-[0.64rem] uppercase tracking-luxe text-ink/60">
              Written by the Elite Decofe studio ·{' '}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
          </FadeIn>
        </div>
      </article>

      <section className="border-t border-ink/10 bg-paper-soft py-20" aria-label="More entries">
        <div className="container-luxe">
          <h2 className="eyebrow mb-10">Continue reading</h2>
          <ul className="grid gap-8 md:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/blog/${other.slug}`}
                  data-cursor="link"
                  className="group flex flex-col gap-3 border-t border-ink/10 pt-6"
                >
                  <span className="text-[0.62rem] uppercase tracking-luxe text-gold-700">
                    {other.category}
                  </span>
                  <span className="font-display text-fluid-lg font-semibold leading-tight text-ink transition-colors duration-500 group-hover:text-gold-800">
                    {other.title}
                  </span>
                  <span className="text-sm font-normal leading-relaxed text-ink/70">
                    {other.excerpt}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
