import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/layout/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { RevealImage } from '@/components/ui/RevealImage'
import { RevealText } from '@/components/ui/RevealText'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, breadcrumbJsonLd, projectJsonLd } from '@/lib/seo'
import { PROJECTS, getProject, getAdjacentProjects } from '@/lib/data/projects'

type Params = { params: Promise<{ slug: string }> }

/** Pre-renders every project at build time — each detail page ships as static HTML. */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return createMetadata({
      title: 'Project not found',
      description: 'This project could not be found.',
      path: `/portfolio/${slug}`,
    })
  }

  return createMetadata({
    title: `${project.title} — ${project.location}`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
    image: project.cover,
    keywords: [project.category, project.style, project.location, 'interior design project'],
  })
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />

      <PageHero
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        description={project.summary}
        image={project.cover}
        imageAlt={`${project.title} — ${project.style} interior in ${project.location}`}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: project.title, href: `/portfolio/${project.slug}` },
        ]}
        meta={[
          { label: 'Location', value: project.location },
          { label: 'Scope', value: project.area },
          { label: 'Style', value: project.style },
          { label: 'Year', value: project.year },
        ]}
      />

      {/* Narrative */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="story-heading">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-32 flex flex-col gap-8">
              <h2 id="story-heading" className="eyebrow">
                The Brief
              </h2>

              <dl className="flex flex-col gap-6 border-t border-ink/10 pt-7">
                <div className="flex flex-col gap-1.5">
                  <dt className="text-[0.6rem] uppercase tracking-luxe text-ink/60">Client</dt>
                  <dd className="text-sm text-ink/80">{project.client}</dd>
                </div>
                <div className="flex flex-col gap-2">
                  <dt className="text-[0.6rem] uppercase tracking-luxe text-ink/60">Scope</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {project.scope.map((item) => (
                        <li
                          key={item}
                          className="rounded-pill border border-ink/10 px-3.5 py-1.5 text-[0.62rem] uppercase tracking-luxe text-ink/60"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <MagneticButton className="w-fit">
                <Button href="/contact" variant="outline" size="sm">
                  Discuss a similar project
                </Button>
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-8">
            <RevealText
              as="p"
              className="font-display text-fluid-xl font-semibold leading-[1.25] text-ink/90"
            >
              {project.story[0]}
            </RevealText>

            <FadeIn stagger={0.1} delay={0.1}>
              {project.story.slice(1).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="max-w-2xl text-fluid-base font-normal leading-relaxed text-ink/65"
                >
                  {paragraph}
                </p>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-paper pb-24 md:pb-32" aria-label={`${project.title} gallery`}>
        <div className="container-luxe flex flex-col gap-6 md:gap-10">
          {project.gallery.map((shot, i) => (
            <figure
              key={shot.src}
              className={
                i % 3 === 0
                  ? 'w-full'
                  : i % 3 === 1
                    ? 'w-full md:ml-auto md:w-[68%]'
                    : 'w-full md:w-[78%]'
              }
            >
              <RevealImage
                src={shot.src}
                alt={shot.alt}
                className={`w-full rounded-arch ${i % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                parallax={i % 2 === 0 ? 8 : -6}
                from={i % 2 === 0 ? 'bottom' : 'left'}
                sizes="(max-width: 768px) 100vw, 75vw"
              />
              {shot.caption && (
                <figcaption className="mt-4 text-[0.64rem] uppercase tracking-luxe text-ink/60">
                  {shot.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      {/* Prev / next */}
      <nav
        aria-label="Project navigation"
        className="border-y border-ink/10 bg-paper-soft"
      >
        <div className="container-luxe grid divide-y divide-ink/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          {prev && (
            <Link
              href={`/portfolio/${prev.slug}`}
              data-cursor="link"
              className="group flex flex-col gap-3 py-12 pr-6 transition-colors md:pr-12"
            >
              <span className="text-[0.62rem] uppercase tracking-luxe text-ink/60">
                ← Previous
              </span>
              <span className="font-display text-fluid-xl font-semibold text-ink transition-colors duration-500 group-hover:text-gold-800">
                {prev.title}
              </span>
              <span className="text-[0.62rem] uppercase tracking-luxe text-ink/65">
                {prev.location}
              </span>
            </Link>
          )}

          {next && (
            <Link
              href={`/portfolio/${next.slug}`}
              data-cursor="link"
              className="group flex flex-col items-end gap-3 py-12 pl-6 text-right transition-colors md:pl-12"
            >
              <span className="text-[0.62rem] uppercase tracking-luxe text-ink/60">Next →</span>
              <span className="font-display text-fluid-xl font-semibold text-ink transition-colors duration-500 group-hover:text-gold-800">
                {next.title}
              </span>
              <span className="text-[0.62rem] uppercase tracking-luxe text-ink/65">
                {next.location}
              </span>
            </Link>
          )}
        </div>
      </nav>

      <CallToAction />
    </>
  )
}
