import { img } from '@/lib/images'
import type { Post } from '@/types'

export const POSTS: Post[] = [
  {
    slug: 'the-case-for-unlacquered-brass',
    title: 'The Case for Unlacquered Brass',
    excerpt:
      'Why we specify a finish that is guaranteed to change, in an industry obsessed with surfaces that never do.',
    date: '2026-07-18',
    readTime: '6 min',
    category: 'Materials',
    cover: img('1533090161767-e6ffed986c88', 1800),
    body: [
      'Lacquer is a promise that nothing will happen. It is also, almost always, a promise that gets broken — in year four, in an uneven patch near the handle, where the coating fails first and the metal beneath is trapped behind a film nobody can repair.',
      'Unlacquered brass makes the opposite promise. It will change. It will darken where hands rest, stay bright where a cloth passes daily, and within eighteen months it will hold a record of how the room is actually used.',
      'We prepare clients for this carefully. A patina is only beautiful when it was chosen; when it arrives unannounced it simply reads as neglect. The conversation happens at concept stage, never at handover.',
      'The practical argument is just as strong. A patinated surface can be returned to full brightness with lemon and salt in about four minutes. A failed lacquer requires stripping, polishing and recoating by a specialist.',
    ],
  },
  {
    slug: 'designing-for-indian-light',
    title: 'Designing for Indian Light',
    excerpt:
      'A north-facing room in Mumbai behaves nothing like a north-facing room in Milan. Most imported palettes ignore this.',
    date: '2026-05-02',
    readTime: '8 min',
    category: 'Practice',
    cover: img('1615529182904-14819c35db37', 1800),
    body: [
      'Indian daylight is high, hard and heavily saturated for most of the year. A palette developed under the soft northern light of a European studio will read entirely differently once it lands in Hyderabad.',
      'We test every finish on site, at three times of day, for a minimum of two days before it is signed off. Studio lightboxes are a useful filter, never a verdict.',
      'The most common failure is white. A cool white that looks crisp in a catalogue turns distinctly blue under high UV, then grey again after dusk. We almost always warm our whites by two or three points.',
      'The second is stone. Highly reflective polished finishes amplify an already bright environment into glare. Honed and leathered surfaces do the opposite: they absorb the excess and give the room its calm back.',
    ],
  },
  {
    slug: 'what-turnkey-should-actually-mean',
    title: 'What Turnkey Should Actually Mean',
    excerpt:
      'The word has been diluted to the point of meaninglessness. Here is the standard we hold ourselves to.',
    date: '2026-02-11',
    readTime: '5 min',
    category: 'Process',
    cover: img('1600607687939-ce8a6c25118c', 1800),
    body: [
      'Turnkey should mean you turn a key and live. Not that you turn a key, then spend six weekends sourcing lamps, chasing a carpenter and arguing about who owns a snag list.',
      'For us it means one contract, one accountable studio, and nineteen trades that never appear in your inbox. Their coordination is our problem, by design.',
      'It also means the beds are made. Genuinely — linen, art, pantry, scent. The difference between a completed project and a home is roughly three weeks of styling work that most studios treat as optional.',
      'Finally, it means a date. A real one, committed in writing at contract stage, with a defined remedy if we miss it. A promise without a consequence is only marketing.',
    ],
  },
]

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug)
