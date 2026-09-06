'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit & { once?: boolean }) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options?.once !== false) observer.disconnect()
        } else if (options?.once === false) {
          setInView(false)
        }
      },
      { threshold: options?.threshold ?? 0.25, rootMargin: options?.rootMargin ?? '0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin, options?.once])

  return { ref, inView }
}
