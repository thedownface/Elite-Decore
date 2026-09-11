/**
 * Central image registry. Every photo is the studio's own site photography,
 * served locally from `public/images` through the Next Image pipeline
 * (AVIF/WebP, responsive srcset) — no remote host, no stock imagery.
 */

const p = (path: string) => `/images/${path}`

/** Every real, usable photo from a completed Elite Decore site — used to
 *  illustrate sections (About, Services) that aren't a specific project. */
export const GALLERY = {
  hero: p('hero.jpg'),
  jaiFortuneKitchen: p('portfolio/jai-fortune-apartments/01-kitchen.jpg'),
  jaiFortuneKitchenDetail: p('portfolio/jai-fortune-apartments/02-kitchen-detail.jpg'),
  jaiFortuneTvUnit: p('portfolio/jai-fortune-apartments/03-tv-unit.jpg'),
  alpineFiesta1: p('portfolio/alpine-fiesta/01-wardrobe.jpg'),
  alpineFiesta2: p('portfolio/alpine-fiesta/02-wardrobe.jpg'),
  alpineFiesta3: p('portfolio/alpine-fiesta/03-wardrobe.jpg'),
  alpineFiesta4: p('portfolio/alpine-fiesta/04-wardrobe.jpg'),
  alpineFiesta5: p('portfolio/alpine-fiesta/05-wardrobe.jpg'),
  balajiRosewoods1: p('portfolio/balaji-rosewoods/01-wardrobe.jpg'),
  balajiRosewoods2: p('portfolio/balaji-rosewoods/02-wardrobe.jpg'),
  balajiRosewoods3: p('portfolio/balaji-rosewoods/03-bedroom.jpg'),
  karle1: p('portfolio/karle-apartments/01-wardrobe.jpg'),
  karle2: p('portfolio/karle-apartments/02-wardrobe.jpg'),
  karle3: p('portfolio/karle-apartments/03-bedroom.jpg'),
  prestige1: p('portfolio/prestige-shantiniketan/01-bedroom.jpg'),
  prestige2: p('portfolio/prestige-shantiniketan/02-bedroom.jpg'),
  prestige3: p('portfolio/prestige-shantiniketan/03-bedroom.jpg'),
  prestigeKitchen: p('portfolio/prestige-shantiniketan/04-kitchen.jpg'),
} as const

export const IMG = {
  heroLiving: GALLERY.hero,
  aboutPortrait: GALLERY.prestige2,
  aboutDetail: GALLERY.jaiFortuneKitchenDetail,
  aboutStudio: GALLERY.balajiRosewoods3,

  serviceResidential: GALLERY.prestige1,
  serviceVilla: GALLERY.karle3,
  serviceKitchen: GALLERY.jaiFortuneKitchen,
  serviceOffice: GALLERY.jaiFortuneTvUnit,
  serviceHospitality: GALLERY.prestige3,
  serviceTurnkey: GALLERY.balajiRosewoods2,
} as const
