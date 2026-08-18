import { createContext, useContext, useEffect, useRef, useState } from 'react'

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

  // Used to be a circle wipe via the View Transitions API. Pulled it: it was
  // the only custom compositing effect left on the site, and it was the
  // thing breaking in both Chrome (fighting the per-element colour
  // transitions underneath it) and Safari. A plain instant flip has nothing
  // left to go wrong, and the transition-colors classes already on most
  // components give it a soft crossfade for free.
  const toggle = () => {
    hasChosen.current = true
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
