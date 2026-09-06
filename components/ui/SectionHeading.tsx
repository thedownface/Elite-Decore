import { cn } from '@/lib/utils'
import { RevealText } from './RevealText'
import { FadeIn } from './FadeIn'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as = 'h2',
}: Props) {
  return (
    <div
      className={cn(
        'flex max-w-5xl flex-col gap-6',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <FadeIn y={14}>
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold-500/60" aria-hidden />
            {eyebrow}
          </span>
        </FadeIn>
      )}

      <RevealText as={as} className="display-poster text-fluid-2xl text-ink">
        {title}
      </RevealText>

      {description && (
        <FadeIn delay={0.15}>
          <p
            className={cn(
              'max-w-2xl text-fluid-base leading-relaxed text-ink/70',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  )
}
