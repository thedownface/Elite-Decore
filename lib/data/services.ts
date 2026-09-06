import { IMG } from '@/lib/images'
import type { Service } from '@/types'

export const SERVICES: Service[] = [
  {
    id: 'residential',
    index: '01',
    title: 'Residential Interiors',
    tagline: 'Homes with a considered interior life',
    description:
      'Apartments and family homes designed around how you actually live — light, circulation and material warmth resolved before a single finish is chosen.',
    deliverables: ['Spatial planning', 'Material palettes', 'Bespoke joinery', 'Art & object curation'],
    image: IMG.serviceResidential,
  },
  {
    id: 'villas',
    index: '02',
    title: 'Luxury Villas',
    tagline: 'Architecture and interior as one gesture',
    description:
      'Ground-up villas where we work alongside your architect from the earliest massing studies, so the inside and the outside were never two decisions.',
    deliverables: ['Architectural collaboration', 'Landscape integration', 'Pool & terrace design', 'Full FF&E'],
    image: IMG.serviceVilla,
  },
  {
    id: 'kitchens',
    index: '03',
    title: 'Modular Kitchens',
    tagline: 'Engineered for the way you cook',
    description:
      'German hardware, Italian stone, Indian craftsmanship. Kitchens detailed to the millimetre and built to survive twenty years of daily use.',
    deliverables: ['Ergonomic layout', 'Appliance integration', 'Stone fabrication', 'Ventilation engineering'],
    image: IMG.serviceKitchen,
  },
  {
    id: 'workspaces',
    index: '04',
    title: 'Office & Workspace',
    tagline: 'Environments that hold attention',
    description:
      'Workplaces designed around acoustics, daylight and quiet status — from boutique studios to headquarters floors for two hundred people.',
    deliverables: ['Workplace strategy', 'Acoustic design', 'Wayfinding & branding', 'Phased fit-out'],
    image: IMG.serviceOffice,
  },
  {
    id: 'hospitality',
    index: '05',
    title: 'Hospitality',
    tagline: 'Spaces guests remember and return to',
    description:
      'Hotels, restaurants and clubhouses conceived as a complete guest journey, with operations and durability written into the design from day one.',
    deliverables: ['Concept & narrative', 'Guest journey mapping', 'FF&E procurement', 'Operational detailing'],
    image: IMG.serviceHospitality,
  },
  {
    id: 'turnkey',
    index: '06',
    title: 'Turnkey Projects',
    tagline: 'One contract. One accountable studio.',
    description:
      'Design, procurement, execution and styling under a single agreement — you receive keys to a finished, furnished, photographed home.',
    deliverables: ['Single-point contract', 'Vendor management', 'Site supervision', 'Styled handover'],
    image: IMG.serviceTurnkey,
  },
]

export const getService = (id: string) => SERVICES.find((s) => s.id === id)
