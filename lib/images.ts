/**
 * Central image registry. Every asset is served through the Next Image pipeline
 * (AVIF/WebP, responsive srcset) — see `next.config.mjs` remotePatterns.
 */
const BASE = 'https://images.unsplash.com/photo-'

export const img = (id: string, w = 1920, q = 72) =>
  `${BASE}${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const IMG = {
  heroLiving: img('1618221195710-dd6b41faaea6', 2400, 78),
  heroAlt: img('1616486338812-3dadae4b4ace', 2000),
  aboutPortrait: img('1600607687939-ce8a6c25118c', 1400),
  aboutDetail: img('1600585154340-be6161a56a0c', 1400),
  aboutStudio: img('1524758631624-e2822e304c36', 1600),

  serviceResidential: img('1618221195710-dd6b41faaea6', 1400),
  serviceVilla: img('1600210492486-724fe5c67fb0', 1400),
  serviceKitchen: img('1631679706909-1844bbd07221', 1400),
  serviceOffice: img('1497366811353-6870744d04b2', 1400),
  serviceHospitality: img('1445019980597-93fa8acb246c', 1400),
  serviceTurnkey: img('1600566753086-00f18fb6b3ea', 1400),

  beforeState: img('1493809842364-78817add7ffb', 1800),
  afterState: img('1600607687920-4e2a09cf159d', 1800),

  ctaGrid: img('1533090161767-e6ffed986c88', 1800),
} as const
