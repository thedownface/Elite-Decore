import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2.5rem', '2xl': '4rem' },
      screens: { '2xl': '1600px' },
    },
    extend: {
      colors: {
        // Paper — the ground the whole site now sits on.
        paper: {
          DEFAULT: '#F4F3EF',
          soft: '#FAFAF8',
          pure: '#FFFFFF',
          muted: '#E9E7E0',
          line: '#DCD9D0',
        },
        ink: {
          DEFAULT: '#0B0B0B',
          soft: '#1A1A1A',
          muted: '#3D3D3D',
        },
        gold: {
          50: '#FBF7EA',
          100: '#F4EBCE',
          200: '#E9D9A4',
          300: '#DCC377',
          400: '#CFAE50',
          500: '#C9A227',
          600: '#A9861D',
          // 700 and darker clear 4.5:1 on paper — the floor for gold body text.
          700: '#856717',
          800: '#5C4710',
          900: '#332708',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        // Big neo-grotesque statements.
        display: ['var(--font-display)', 'Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter Tight', 'system-ui', 'sans-serif'],
        // High-contrast serif, used the way the reference uses its wordmark:
        // sparingly, as punctuation.
        serif: ['var(--font-serif)', 'Instrument Serif', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.72rem, 0.68rem + 0.2vw, 0.82rem)',
        'fluid-sm': 'clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)',
        'fluid-base': 'clamp(1rem, 0.95rem + 0.3vw, 1.25rem)',
        'fluid-lg': 'clamp(1.15rem, 1rem + 0.7vw, 1.6rem)',
        'fluid-xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)',
        'fluid-2xl': 'clamp(2rem, 1.4rem + 3vw, 4.25rem)',
        'fluid-3xl': 'clamp(2.5rem, 1.5rem + 5vw, 6rem)',
        // Edge-to-edge poster type.
        display: 'clamp(3rem, 1rem + 9vw, 10rem)',
        mega: 'clamp(3.4rem, -0.5rem + 13.2vw, 15rem)',
      },
      letterSpacing: {
        mega: '-0.055em',
        tightest: '-0.042em',
        luxe: '0.2em',
      },
      borderRadius: {
        arch: '1.25rem',
        'arch-lg': '2rem',
        pill: '999px',
      },
      boxShadow: {
        // Light-theme shadows: tight contact shadow + a wide, very soft cast.
        soft: '0 1px 2px rgba(11,11,11,0.04), 0 10px 26px -14px rgba(11,11,11,0.14)',
        card: '0 1px 2px rgba(11,11,11,0.05), 0 24px 60px -30px rgba(11,11,11,0.28)',
        lift: '0 2px 6px rgba(11,11,11,0.06), 0 48px 100px -44px rgba(11,11,11,0.38)',
        gold: '0 18px 44px -22px rgba(133,103,23,0.55)',
        ink: '0 18px 44px -22px rgba(11,11,11,0.5)',
        etch: 'inset 0 1px 0 0 rgba(255,255,255,0.9), inset 0 -1px 0 0 rgba(11,11,11,0.05)',
      },
      backgroundImage: {
        'gold-sheen':
          'linear-gradient(110deg, transparent 20%, rgba(233,217,164,0.5) 45%, rgba(255,255,255,0.95) 50%, rgba(233,217,164,0.5) 55%, transparent 80%)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        luxe: 'cubic-bezier(0.62, 0.05, 0.01, 0.99)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        'scroll-hint': {
          '0%,100%': { transform: 'translateY(0)', opacity: '0.25' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        sheen: 'sheen 1.1s cubic-bezier(0.16,1,0.3,1)',
        'scroll-hint': 'scroll-hint 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
