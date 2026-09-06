import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/data/site'
import { PROJECTS } from '@/lib/data/projects'
import { POSTS } from '@/lib/data/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE.url}/process`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.85 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE.url}/portfolio/${project.slug}`,
    lastModified: new Date(`${project.year}-01-01`),
    changeFrequency: 'yearly',
    priority: 0.75,
  }))

  const postRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.55,
  }))

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}
