import { useEffect, useRef, useState } from 'react'

export function useHeaderState(ids) {
  const progressRef = useRef(null)
  const [state, setState] = useState({ scrolled: false, active: null })

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    let frame = 0

    const read = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      const progress = max > 0 ? Math.max(0, Math.min(y / max, 1)) : 0
      const marker = Math.max(96, window.innerHeight * 0.32)
      let active = null
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) active = section.id
      }
      if (max > 0 && max - y <= 2) active = ids[ids.length - 1]
      const scrolled = y > 8

      // Progress is a single compositor transform. React only updates when the
      // active section or header state changes, not on every scroll event.
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
      setState((previous) => previous.active === active && previous.scrolled === scrolled
        ? previous : { active, scrolled })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return { ...state, progressRef }
}
