export type Project = {
  slug: string
  title: string
  location: string
  area: string
  style: string
  year: string
  category: ProjectCategory
  client: string
  scope: string[]
  summary: string
  story: string[]
  cover: string
  gallery: { src: string; alt: string; caption?: string }[]
  featured?: boolean
}

export type ProjectCategory =
  | 'Residential'
  | 'Villa'
  | 'Kitchen'
  | 'Workspace'
  | 'Hospitality'
  | 'Turnkey'

export type Service = {
  id: string
  index: string
  title: string
  tagline: string
  description: string
  deliverables: string[]
  image: string
}

export type ProcessStep = {
  index: string
  title: string
  duration: string
  description: string
  points: string[]
}

export type Testimonial = {
  quote: string
  author: string
  role: string
  location: string
}

export type MaterialSample = {
  id: string
  name: string
  origin: string
  description: string
  finish: string
  swatch: string
  accent: string
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  cover: string
  body: string[]
}

export type NavLink = { label: string; href: string }
