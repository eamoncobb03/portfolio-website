import { useEffect, useState } from 'react'

/**
 * Everything the header reads off the scroll position: how far down the page we
 * are, whether we have left the very top, and which section is being read.
 *
 * All three come from one listener and one pass, because they are the same
 * question asked three ways and splitting them meant two listeners measuring
 * the same scroll.
 *
 * The active section is worked out from geometry rather than from an
 * IntersectionObserver. The observer version flickered badly: its callback is
 * handed only the entries whose intersection *changed*, not every section being
 * watched, so choosing "the one nearest the top" from that argument picks from
 * a partial set. A section that merely twitched at the edge of the viewport
 * would win over the one actually on screen, and the underline flipped
 * backwards as you scrolled.
 *
 * Reading position directly cannot do that. Sections are walked in document
 * order and the last one whose top has crossed the marker wins, so the answer
 * only ever moves forward as you scroll down and back as you scroll up.
 */
export function useHeaderState(ids) {
  const [state, setState] = useState({ progress: 0, scrolled: false, active: null })

  useEffect(() => {
    const read = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0

      // A third of the way down the viewport, and never closer than the
      // header's own height: a section becomes current once its heading has
      // properly arrived, not while it is still hidden behind the bar.
      const marker = Math.max(96, window.innerHeight * 0.32)

      let active = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= marker) active = id
      }

      // On a tall window the last section is short enough that the page runs
      // out of scroll before its top can reach the marker, so the rule above
      // would never light it. Hitting the bottom is what lights it instead.
      //
      // This has to be a test on scroll position and nothing else. Comparing
      // the distance the section still had to travel against the scroll
      // remaining looks like it says the same thing, but scrollY cancels out of
      // both sides: it reduces to a constant for a given layout, true at every
      // position or none, which on a tall viewport pinned this section on from
      // the very top of the page.
      if (max > 0 && max - window.scrollY <= 2) active = ids[ids.length - 1]

      setState((prev) =>
        prev.progress === progress && prev.active === active && prev.scrolled === window.scrollY > 8
          ? prev
          : { progress, active, scrolled: window.scrollY > 8 },
      )
    }

    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [ids])

  return state
}
