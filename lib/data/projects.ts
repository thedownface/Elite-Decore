import { GALLERY } from '@/lib/images'
import type { Project } from '@/types'

/**
 * Real Elite Decore site photography, organised by apartment. Each project
 * documents the rooms we actually worked on (kitchen, wardrobes, a bedroom)
 * rather than a whole-flat renovation — see `scope` for exactly what that was.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'prestige-shantiniketan',
    title: 'Prestige Shantiniketan',
    location: 'Whitefield, Bengaluru',
    area: '3 Bedrooms + Modular Kitchen',
    style: 'Warm Contemporary',
    year: '2025',
    category: 'Turnkey',
    client: 'Private Residence',
    scope: ['Full-Home Interiors', 'Modular Kitchen', 'False Ceiling & Lighting', 'Custom Furniture'],
    summary:
      'A full-home fit-out across three bedrooms and the kitchen, each room given its own material identity rather than one palette repeated on a loop.',
    story: [
      'The primary bedroom is built around a mustard-leather upholstered bed and a fabric-panelled feature wall lit from a raked wooden pelmet — warm, low, and deliberately soft against the tiled floor.',
      'A second bedroom takes the opposite register: a book-matched marble platform bed with an inlaid backlit motif, framed by full-height marble storage on both sides and a crystal chandelier overhead.',
      'The kitchen is graphite-grey gloss with brass trim, built around a tall housing unit for the oven and microwave and a marble-effect backsplash that runs the full run of the counter.',
    ],
    cover: GALLERY.prestige1,
    gallery: [
      { src: GALLERY.prestige1, alt: 'Primary bedroom with mustard leather bed and backlit fabric feature wall', caption: 'Primary bedroom' },
      { src: GALLERY.prestige2, alt: 'Bedroom with book-matched marble platform bed and crystal chandelier', caption: 'Guest bedroom' },
      { src: GALLERY.prestige3, alt: 'Bedroom with colourful gallery wall and diagonal wood-panelled headboard', caption: "Children's bedroom" },
      { src: GALLERY.prestigeKitchen, alt: 'Graphite-grey modular kitchen with brass trim and built-in oven', caption: 'Modular kitchen' },
    ],
    featured: true,
  },
  {
    slug: 'jai-fortune-apartments',
    title: 'Jai Fortune Apartments',
    location: 'Bengaluru',
    area: 'Modular Kitchen + TV Unit',
    style: 'Contemporary Glosswork',
    year: '2025',
    category: 'Kitchen',
    client: 'Private Residence',
    scope: ['Modular Kitchen', 'Stone Backsplash', 'TV Unit & Wall Panelling', 'Lighting Design'],
    summary:
      'A black-and-white lacquered kitchen finished in rose-gold trims, paired with a fluted-wood media wall built on the diagonal in the living room.',
    story: [
      'The kitchen runs white high-gloss overheads against a charcoal-marble base, split by a continuous rose-gold reveal that carries the eye around the full L-shaped run.',
      'A book-matched marble backsplash climbs the full height between counter and cabinetry, framed on both sides by concealed under-cabinet lighting.',
      'In the living room, the television wall is set on a sharp diagonal in fluted wood and marble-effect stone, with a backlit edge that keeps the whole panel from reading as flat.',
    ],
    cover: GALLERY.jaiFortuneKitchen,
    gallery: [
      { src: GALLERY.jaiFortuneKitchen, alt: 'White gloss modular kitchen with rose-gold trim and marble backsplash', caption: 'Modular kitchen' },
      { src: GALLERY.jaiFortuneKitchenDetail, alt: 'Charcoal marble kitchen counter with rose-gold cabinet edging', caption: 'Kitchen detail' },
      { src: GALLERY.jaiFortuneTvUnit, alt: 'Diagonal fluted-wood television feature wall with backlit marble panel', caption: 'Living room media wall' },
    ],
    featured: true,
  },
  {
    slug: 'alpine-fiesta',
    title: 'Alpine Fiesta',
    location: 'Bengaluru',
    area: '5 Wardrobe & Storage Units',
    style: 'Modular Wardrobe Systems',
    year: '2024',
    category: 'Residential',
    client: 'Private Residence',
    scope: ['Bedroom Wardrobes', 'Foyer Storage', 'Custom Storage Design', 'Hardware Detailing'],
    summary:
      'Five wardrobes across one home, each detailed differently — proof that "modular" does not have to mean identical.',
    story: [
      'No two wardrobes in this home repeat the same finish: a two-tone walnut-and-oak hinged unit, a fluted-teak sliding wall with diamond inlay handles, a soft sage-and-white glass-shutter run, and a mirrored hinged wardrobe with a floral glass accent panel.',
      'A dedicated foyer storage unit — open shelving over a three-drawer base — was built to take the household\'s bags, books and everyday clutter before it reaches the living room.',
      'Every shutter was matched to its room\'s existing palette rather than a single house style, which is why the five units read as considered rather than mismatched.',
    ],
    cover: GALLERY.alpineFiesta2,
    gallery: [
      { src: GALLERY.alpineFiesta1, alt: 'Two-tone walnut and oak hinged wardrobe with brushed handles' },
      { src: GALLERY.alpineFiesta2, alt: 'Fluted teak sliding wardrobe wall with diamond inlay handles', caption: 'Sliding wardrobe wall' },
      { src: GALLERY.alpineFiesta3, alt: 'Sage and white glass-shutter wardrobe with open shelving' },
      { src: GALLERY.alpineFiesta4, alt: 'Honey-oak hinged wardrobe with central mirror panel' },
      { src: GALLERY.alpineFiesta5, alt: 'Mirrored wardrobe with floral-etched glass accent panel' },
    ],
    featured: true,
  },
  {
    slug: 'balaji-rosewoods',
    title: 'Balaji Rosewoods Apartments',
    location: 'Bengaluru',
    area: 'Bedroom + 2 Wardrobe Units',
    style: 'Warm Contemporary',
    year: '2024',
    category: 'Residential',
    client: 'Private Residence',
    scope: ['Bedroom Wardrobes', 'Feature Wall', 'False Ceiling & Cove Lighting'],
    summary:
      'A cherry-blossom mural anchors the bedroom; two very different wardrobe finishes anchor the rest of the home.',
    story: [
      'The bedroom is built around a hand-painted blossom mural, framed by fluted brass-trimmed panels and a pair of ring pendant lights that drop either side of the headboard — a cove-lit tray ceiling and a chandelier hold the room together from above.',
      'One wardrobe is a graphite-and-white sliding system with a slim frameless mirror; a second, in a different room, is a dark walnut sliding unit with a geometric hexagon inlay band across its centre.',
    ],
    cover: GALLERY.balajiRosewoods3,
    gallery: [
      { src: GALLERY.balajiRosewoods1, alt: 'Graphite and white sliding wardrobe with corner shelving and mirror' },
      { src: GALLERY.balajiRosewoods2, alt: 'Dark walnut sliding wardrobe with geometric hexagon inlay band' },
      { src: GALLERY.balajiRosewoods3, alt: 'Bedroom with cherry-blossom mural feature wall and ring pendant lighting', caption: 'Primary bedroom' },
    ],
    featured: true,
  },
  {
    slug: 'karle-apartments',
    title: 'Karle Apartments',
    location: 'Bengaluru',
    area: 'Bedroom + 2 Wardrobe Units',
    style: 'Classic Contemporary',
    year: '2023',
    category: 'Residential',
    client: 'Private Residence',
    scope: ['Bedroom Wardrobes', 'Feature Wall', 'Vanity Mirror Integration'],
    summary:
      'A sharp, angular headboard wall in book-matched marble and wood slats, set against two wardrobes finished a generation apart in style.',
    story: [
      'The bedroom\'s headboard wall cuts on the diagonal in white marble and warm timber slatting, backlit along the seam so the angle reads clearly at night as well as by day.',
      'One wardrobe pairs warm oak with a white laminate band and integrated vanity mirror; a second, in the same home, is a honey-toned hinged unit with a floral-etched glass door and matching bedside table.',
    ],
    cover: GALLERY.karle3,
    gallery: [
      { src: GALLERY.karle1, alt: 'Wood-tone sliding wardrobe with white laminate band' },
      { src: GALLERY.karle2, alt: 'Honey-oak hinged wardrobe with floral-etched glass door' },
      { src: GALLERY.karle3, alt: 'Angular marble and wood-slat headboard feature wall', caption: 'Primary bedroom' },
    ],
    featured: false,
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug)

export const getAdjacentProjects = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  }
}

export const PROJECT_CATEGORIES = [
  'All',
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
] as const
