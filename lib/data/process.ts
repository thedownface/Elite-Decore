import type { ProcessStep } from '@/types'

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discovery',
    duration: 'Week 1 – 2',
    description:
      'We sit with you, walk the site, and listen far longer than we speak. The output is a written brief you approve before any design begins.',
    points: ['Lifestyle interview', 'Site survey & measurement', 'Budget framework', 'Written design brief'],
  },
  {
    index: '02',
    title: 'Concept',
    duration: 'Week 3 – 5',
    description:
      'Spatial strategy, material direction and a narrative. We present two distinct directions — never a safe option and a decoy.',
    points: ['Space planning', 'Mood & material boards', 'Two design directions', 'Concept presentation'],
  },
  {
    index: '03',
    title: 'Visualisation',
    duration: 'Week 6 – 9',
    description:
      'Photoreal renders and a walkthrough at true scale, so you approve a space you have effectively already stood inside.',
    points: ['3D modelling', 'Photoreal rendering', 'VR walkthrough', 'Lighting simulation'],
  },
  {
    index: '04',
    title: 'Execution',
    duration: 'Month 3 – 7',
    description:
      'Tender, procurement and site. Our project managers are on site three times a week with a weekly written report in your inbox.',
    points: ['Working drawings', 'Vendor tendering', 'Site supervision', 'Weekly progress reports'],
  },
  {
    index: '05',
    title: 'Styling',
    duration: 'Final 3 weeks',
    description:
      'Art, objects, textiles and scent. The layer that separates a completed project from a home somebody actually lives in.',
    points: ['Art curation', 'Soft furnishing', 'Object styling', 'Photography direction'],
  },
  {
    index: '06',
    title: 'Delivery',
    duration: 'Handover day',
    description:
      'Snag-free handover, a maintenance dossier for every material, and a two-year studio warranty on all bespoke work.',
    points: ['Snag resolution', 'Material care dossier', 'Two-year warranty', 'Aftercare visits'],
  },
]
