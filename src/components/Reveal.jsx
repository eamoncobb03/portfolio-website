import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const pending = new Map()
let observer

function observeOnce(element, show) {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      pending.get(entry.target)?.()
      pending.delete(entry.target)
      observer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -24px 0px', threshold: 0.01 })
  pending.set(element, show)
  observer.observe(element)
  return () => {
    pending.delete(element)
    observer.unobserve(element)
  }
}

// All entrance effects share one observer and stop being observed after arrival.
// Content defaults to visible in CSS when reduced motion is requested.
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className,
  children,
  style,
  ...props
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    return observeOnce(ref.current, () => setShown(true))
  }, [])

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      data-variant={variant}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      className={cn('reveal', className)}
      {...props}
    >
      {variant === 'mask' ? <span className="reveal-mask-inner">{children}</span> : children}
    </Tag>
  )
}
