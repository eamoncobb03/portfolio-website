import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Reveals its children the first time they scroll into view.
 *
 * `variant` picks the movement: 'up' is the default lift, 'left'/'right' slide
 * in from the side, 'scale' settles in from slightly small, and 'mask' wipes a
 * line up from behind its own edge, which suits large display type. `delay`
 * staggers siblings; keep it small, a list should feel like one movement
 * rather than a queue.
 *
 * 'mask' hides an inner element rather than this one. Hiding the observed
 * element itself with a clip is a trap: a clipped box reports an intersection
 * ratio of 0, so the observer that would reveal it never fires and the content
 * stays hidden forever.
 *
 * All of the motion is CSS (see .reveal in index.css). This only decides when
 * to flip the switch.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className,
  children,
  ...props
}) {
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
      data-variant={variant}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={cn('reveal', className)}
      {...props}
    >
      {variant === 'mask' ? <span className="reveal-mask-inner">{children}</span> : children}
    </Tag>
  )
}
