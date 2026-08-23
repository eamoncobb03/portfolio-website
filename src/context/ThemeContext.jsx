import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

const STORAGE_KEY = 'portfolio-theme'
// Must match --background in index.css, or the iOS status bar colour drifts.
const BG = { light: '#f7f7f3', dark: '#0a0d11' }

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }) {
  // Once true, the visitor's own choice is what persists.
  const hasChosen = useRef(
    typeof localStorage !== 'undefined' &&
      ['light', 'dark'].includes(localStorage.getItem(STORAGE_KEY)),
  )

  // Dark unless they've picked otherwise. The design is built dark first, so
  // defaulting to the OS would show half of all visitors the fallback rather
  // than the intended look.
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')

    if (hasChosen.current) localStorage.setItem(STORAGE_KEY, theme)

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', BG[theme])
  }, [theme])

  /**
   * Repaints the page under a circular wipe spreading from wherever the toggle
   * was pressed.
   *
   * This effect existed once before and was pulled, because it fought the
   * `transition-colors` sitting on most components: the View Transition holds a
   * still image of the old theme while every element underneath is separately
   * easing towards the new one, and the two disagree for the whole animation.
   * The `theme-switching` class is what makes it work this time. It kills every
   * transition on the page for the length of the wipe, so the elements flip
   * instantly and the circle is the only thing moving.
   *
   * Falls back to the plain flip wherever the API is missing (Firefox today) or
   * the visitor asked for less motion, which is the behaviour this replaces
   * rather than something worse.
   */
  const toggle = (event) => {
    hasChosen.current = true
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !document.startViewTransition) {
      setTheme(next)
      return
    }

    // The press point, so the circle opens from under the visitor's finger
    // rather than from an arbitrary corner. Falls back to the toggle's own
    // place in the header when there is no pointer, e.g. keyboard activation.
    const source = event?.currentTarget?.getBoundingClientRect?.()
    const x = event?.clientX || (source ? source.left + source.width / 2 : window.innerWidth - 40)
    const y = event?.clientY || (source ? source.top + source.height / 2 : 40)

    // Far enough to cover the furthest corner from that point.
    const reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    root.style.setProperty('--wipe-x', `${x}px`)
    root.style.setProperty('--wipe-y', `${y}px`)
    root.style.setProperty('--wipe-r', `${reach}px`)
    root.classList.add('theme-switching')

    const transition = document.startViewTransition(() => {
      // Synchronous, because the callback has to leave the DOM already in its
      // new state before the API takes its second snapshot.
      flushSync(() => setTheme(next))
    })

    transition.finished.finally(() => root.classList.remove('theme-switching'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
