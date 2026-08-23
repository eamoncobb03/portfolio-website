import { useEffect, useState } from 'react'

/**
 * How far down the page we are, 0 to 1, plus whether we have left the very top.
 *
 * Read off a scroll listener rather than a CSS scroll-driven animation: those
 * are still Chromium-only, and where they are unsupported the progress bar
 * would sit silently at zero rather than degrade to something sensible.
 *
 * The listener only stores a number and lets React paint it; there is no layout
 * read per event beyond scrollY and two cached document heights, so it stays
 * cheap without needing to be throttled.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
      setScrolled(window.scrollY > 8)
    }

    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [])

  return { progress, scrolled }
}

/**
 * Which section is currently being read.
 *
 * Picks the entry closest to the top of the viewport rather than simply the
 * first one intersecting, because with a tall section above a short one both
 * are on screen at once and "first" flickers between them as you scroll. The
 * root margin pulls the decision line down under the fixed header, so a section
 * counts as current once its heading clears the bar rather than while it is
 * still hidden behind it.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (!visible.length) return
        const nearest = visible.reduce((best, e) =>
          Math.abs(e.boundingClientRect.top) < Math.abs(best.boundingClientRect.top) ? e : best,
        )
        setActive(nearest.target.id)
      },
      { rootMargin: '-72px 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}
