import type { MaterialSample } from '@/types'

/** Material library rendered procedurally in the Three.js sampler. */
export const MATERIALS: MaterialSample[] = [
  {
    id: 'marble',
    name: 'Calacatta Marble',
    origin: 'Carrara, Italy',
    description:
      'Book-matched slabs with grey-gold veining. Honed to 400 grit so the surface reads soft rather than reflective.',
    finish: 'Honed · 20mm',
    swatch: '#EFEBE4',
    accent: '#C9A227',
  },
  {
    id: 'walnut',
    name: 'American Walnut',
    origin: 'Pennsylvania, USA',
    description:
      'Crown-cut veneer over marine ply, finished in hardwax oil. Darkens gracefully over the first three years.',
    finish: 'Hardwax oil · Matte',
    swatch: '#5B3A26',
    accent: '#B4794A',
  },
  {
    id: 'oak',
    name: 'European Oak',
    origin: 'Slavonia, Croatia',
    description:
      'Rift-sawn and fumed, chosen for its exceptionally straight grain and near-total dimensional stability.',
    finish: 'Fumed · Brushed',
    swatch: '#C4A277',
    accent: '#E0C79B',
  },
  {
    id: 'brass',
    name: 'Unlacquered Brass',
    origin: 'Moradabad, India',
    description:
      'Solid CZ121 brass, hand-brushed and left unlacquered so it patinas with every touch. Restorable indefinitely.',
    finish: 'Brushed · Living finish',
    swatch: '#C9A227',
    accent: '#F0DFA8',
  },
  {
    id: 'concrete',
    name: 'Board-Formed Concrete',
    origin: 'Cast in situ',
    description:
      'Poured against reclaimed teak boards so the timber grain is permanently transferred into the wall face.',
    finish: 'Sealed · Untinted',
    swatch: '#8C8983',
    accent: '#B9B5AD',
  },
]
