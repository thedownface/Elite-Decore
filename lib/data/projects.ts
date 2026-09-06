import { img } from '@/lib/images'
import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    slug: 'aurelia-residence',
    title: 'Aurelia Residence',
    location: 'Worli, Mumbai',
    area: '6,400 sq ft',
    style: 'Warm Minimalism',
    year: '2025',
    category: 'Residential',
    client: 'Private Family Office',
    scope: ['Interior Architecture', 'Bespoke Joinery', 'Art Curation', 'Lighting Design'],
    summary:
      'A sea-facing duplex reduced to its essentials — travertine planes, brushed brass reveals and a light that changes character six times a day.',
    story: [
      'The brief was disarmingly simple: remove everything that does not serve stillness. We stripped the duplex to its shell and rebuilt the plan around a single north–south axis that lets the Arabian Sea read from the entrance foyer.',
      'Materiality carries the entire narrative. Roman travertine floors run wall to wall without a threshold, met by hand-rubbed walnut joinery and a whisper of unlacquered brass that will patina with the family over decades.',
      'Lighting was engineered as architecture. Sixty-two individually calibrated fittings sit flush within plaster reveals, tuned to 2700K in the evening so the stone glows rather than reflects.',
    ],
    cover: img('1618221195710-dd6b41faaea6', 2400, 78),
    gallery: [
      { src: img('1600585154340-be6161a56a0c', 1800), alt: 'Living room with travertine flooring and low seating', caption: 'The living volume, seen from the entry axis' },
      { src: img('1586023492125-27b2c045efd7', 1800), alt: 'Bespoke sofa detail in bouclé and walnut' },
      { src: img('1590490360182-c33d57733427', 1800), alt: 'Marble bathroom with brass fittings', caption: 'Master ensuite in book-matched Calacatta' },
      { src: img('1616594039964-ae9021a400a0', 1800), alt: 'Dining area with sculptural pendant lighting' },
    ],
    featured: true,
  },
  {
    slug: 'villa-numera',
    title: 'Villa Numera',
    location: 'Alibaug, Maharashtra',
    area: '11,200 sq ft',
    style: 'Coastal Brutalist',
    year: '2024',
    category: 'Villa',
    client: 'Numera Holdings',
    scope: ['Architecture Collaboration', 'Full Interiors', 'Landscape Styling', 'Turnkey Delivery'],
    summary:
      'Board-formed concrete meets teak and raw linen in a weekend villa built to weather monsoon salt for a hundred years.',
    story: [
      'Sited on a laterite ridge, the villa is organised as four pavilions around a courtyard that floods, deliberately, during the monsoon — a shallow reflecting plane for three months of the year.',
      'We specified board-formed concrete cast against reclaimed Burma teak, so the walls carry the grain of the wood that shaped them. Nothing inside is painted.',
      'Furniture is almost entirely bespoke and built on site by a team of eleven craftsmen over nine months, using a single felled rain tree from the property itself.',
    ],
    cover: img('1600210492486-724fe5c67fb0', 2400, 78),
    gallery: [
      { src: img('1600566753086-00f18fb6b3ea', 1800), alt: 'Concrete and timber villa interior', caption: 'The east pavilion at first light' },
      { src: img('1615529182904-14819c35db37', 1800), alt: 'Bedroom opening onto a courtyard' },
      { src: img('1618219908412-a29a1bb7b86e', 1800), alt: 'Courtyard reflecting pool' },
      { src: img('1604709177225-055f99402ea3', 1800), alt: 'Detail of raw linen drapery against concrete' },
    ],
    featured: true,
  },
  {
    slug: 'maison-ardent',
    title: 'Maison Ardent',
    location: 'Koregaon Park, Pune',
    area: '1,850 sq ft',
    style: 'Modern Classical',
    year: '2025',
    category: 'Kitchen',
    client: 'Ardent Family Residence',
    scope: ['Modular Kitchen', 'Pantry Architecture', 'Appliance Integration', 'Stone Fabrication'],
    summary:
      'A culinary theatre in fluted oak and honed Verde Alpi, engineered around a family that cooks together every single evening.',
    story: [
      'The client cooks for fourteen people most weekends. The plan therefore abandons the work-triangle orthodoxy for two independent prep zones that never collide.',
      'Fluted European oak fronts are finished in a matte hardwax oil that can be repaired by hand rather than replaced — a deliberate rejection of disposable luxury.',
      'A single 3.8 metre slab of honed Verde Alpi forms the island, its veining aligned to point toward the terrace doors.',
    ],
    cover: img('1631679706909-1844bbd07221', 2400, 78),
    gallery: [
      { src: img('1556909212-d5b604d0c90d', 1800), alt: 'Kitchen island in green marble', caption: 'The Verde Alpi island' },
      { src: img('1600121848594-d8644e57abab', 1800), alt: 'Fluted oak cabinetry detail' },
      { src: img('1600607687920-4e2a09cf159d', 1800), alt: 'Integrated pantry storage' },
    ],
    featured: true,
  },
  {
    slug: 'meridian-workspace',
    title: 'Meridian Workspace',
    location: 'BKC, Mumbai',
    area: '28,000 sq ft',
    style: 'Editorial Corporate',
    year: '2024',
    category: 'Workspace',
    client: 'Meridian Capital',
    scope: ['Workplace Strategy', 'Interior Fit-out', 'Acoustic Design', 'Wayfinding'],
    summary:
      'A private-equity headquarters that reads as a members club — acoustically engineered, materially restrained, quietly powerful.',
    story: [
      'Two hundred and forty people, zero visible cable management, and an acoustic target of 38 dB in open plan. The engineering is invisible; that is the point.',
      'We replaced the conventional reception with a library — 2,800 volumes on smoked oak shelving — so the first impression is intellect rather than status.',
      'Every workstation sits within seven metres of daylight, verified through a full-year climate simulation before a single wall was drawn.',
    ],
    cover: img('1497366811353-6870744d04b2', 2400, 78),
    gallery: [
      { src: img('1497366754035-f200968a6e72', 1800), alt: 'Open plan workspace with warm lighting', caption: 'The north floor plate' },
      { src: img('1524758631624-e2822e304c36', 1800), alt: 'Executive lounge with leather seating' },
      { src: img('1567767292278-a4f21aa2d36e', 1800), alt: 'Meeting room with acoustic panelling' },
    ],
    featured: true,
  },
  {
    slug: 'hotel-lumiere',
    title: 'Hotel Lumière',
    location: 'Panjim, Goa',
    area: '42 keys',
    style: 'Portuguese Revival',
    year: '2023',
    category: 'Hospitality',
    client: 'Lumière Hospitality Group',
    scope: ['Concept Design', 'FF&E', 'Guest Journey', 'Brand Environment'],
    summary:
      'A heritage mansion reawakened as a 42-key boutique hotel, where azulejo blue meets lime plaster and slow, deliberate ceiling fans.',
    story: [
      'The 1890s structure had been subdivided eleven times. We reverse-engineered the original plan from a single surviving municipal drawing and restored the enfilade.',
      'Lime plaster was mixed on site by two artisans over four months, tinted with local laterite so the walls shift from rose to ochre as the day turns.',
      'Each of the 42 keys has a different tile floor, drawn from a family of nine patterns — guests return asking for a room by its pattern, not its number.',
    ],
    cover: img('1445019980597-93fa8acb246c', 2400, 78),
    gallery: [
      { src: img('1566073771259-6a8506099945', 1800), alt: 'Hotel suite with heritage detailing', caption: 'Suite 04, garden facing' },
      { src: img('1594026112284-02bb6f3352fe', 1800), alt: 'Hotel lobby lounge' },
      { src: img('1560448204-e02f11c3d0e2', 1800), alt: 'Guest bathroom with vintage fittings' },
    ],
    featured: true,
  },
  {
    slug: 'the-stone-pavilion',
    title: 'The Stone Pavilion',
    location: 'Whitefield, Bengaluru',
    area: '9,700 sq ft',
    style: 'Japandi Restraint',
    year: '2025',
    category: 'Turnkey',
    client: 'Private Residence',
    scope: ['Turnkey Execution', 'Structural Coordination', 'Bespoke Furniture', 'Handover Styling'],
    summary:
      'A full turnkey delivery in 214 days — from bare shell to styled handover, with the client walking in to a home that was simply, completely ready.',
    story: [
      'Turnkey is a promise about time. We committed to 214 days and delivered on day 211, with a single consolidated contract across nineteen trades.',
      'The material palette is deliberately narrow: grey limestone, white oak, washi paper and blackened steel. Four materials, applied with discipline, across nine thousand square feet.',
      'On handover day the beds were made, the pantry stocked and the art hung. The family arrived with suitcases and nothing else.',
    ],
    cover: img('1600607687939-ce8a6c25118c', 2400, 78),
    gallery: [
      { src: img('1616486338812-3dadae4b4ace', 1800), alt: 'Minimal living space in oak and limestone', caption: 'The main hall, day of handover' },
      { src: img('1583847268964-b28dc8f51f92', 1800), alt: 'Staircase detail in blackened steel' },
      { src: img('1617806118233-18e1de247200', 1800), alt: 'Bedroom with washi screen' },
      { src: img('1502005229762-cf1b2da7c5d6', 1800), alt: 'Study nook with built-in shelving' },
    ],
    featured: true,
  },
  {
    slug: 'casa-sereno',
    title: 'Casa Sereno',
    location: 'Jubilee Hills, Hyderabad',
    area: '4,300 sq ft',
    style: 'Mediterranean Calm',
    year: '2023',
    category: 'Residential',
    client: 'Private Residence',
    scope: ['Interior Design', 'Custom Lighting', 'Soft Furnishing'],
    summary:
      'Arched thresholds, plaster in the colour of unbleached cotton, and a courtyard olive tree that anchors the whole plan.',
    story: [
      'The apartment had good bones and terrible partitions. Nine walls came down; three arches went up.',
      'We used a single plaster tone throughout, varying only its finish — polished at eye level, brushed above — so the light does the work the paint usually would.',
    ],
    cover: img('1616486338812-3dadae4b4ace', 2400, 78),
    gallery: [
      { src: img('1615529182904-14819c35db37', 1800), alt: 'Arched doorway in warm plaster' },
      { src: img('1586023492125-27b2c045efd7', 1800), alt: 'Living seating in natural linen' },
    ],
  },
  {
    slug: 'atelier-noir',
    title: 'Atelier Noir',
    location: 'Connaught Place, New Delhi',
    area: '5,600 sq ft',
    style: 'Dark Editorial',
    year: '2024',
    category: 'Workspace',
    client: 'Noir Creative Agency',
    scope: ['Studio Design', 'Acoustic Ceilings', 'Bespoke Millwork'],
    summary:
      'A creative agency floor rendered almost entirely in charcoal, where the only warmth comes from brass, leather and low pooled light.',
    story: [
      'Dark interiors fail when they flatten. We built depth with seven distinct blacks — matte, satin, woven, brushed, lacquered, stained and smoked.',
      'The central pin-up wall is 14 metres of blackened steel, magnetic across its full span.',
    ],
    cover: img('1524758631624-e2822e304c36', 2400, 78),
    gallery: [
      { src: img('1567767292278-a4f21aa2d36e', 1800), alt: 'Dark meeting room with brass detailing' },
      { src: img('1497366754035-f200968a6e72', 1800), alt: 'Studio floor with pooled task lighting' },
    ],
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
