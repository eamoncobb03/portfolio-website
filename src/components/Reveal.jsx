import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Fades and lifts its children in the first time they scroll into view.
 * `delay` staggers siblings; keep it small, a list should feel like one
 * movement rather than a queue.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children, ...props }) {
  const ref = useRef(null)
  // Anyone who has asked for less motion starts in the shown state, so the
  // observer never runs and the content is simply there.
  const [shown, setShown] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (shown) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      // Fire a little before the element reaches the fold, so the movement has
      // finished by the time it is properly in view.
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={cn('reveal', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
