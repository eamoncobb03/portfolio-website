import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'
const BG = { light: '#f7f7f3', dark: '#0a0d11' }
const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })

function savedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(savedTheme)
  const hasChosen = useRef(false)

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BG[theme])
    if (hasChosen.current) {
      try {
        localStorage.setItem(STORAGE_KEY, theme)
      } catch {
        // The toggle still works when storage is unavailable.
      }
    }
  }, [theme])

  // Native colour transitions reverse from their current position. No overlay,
  // timers, forced layout, or snapshot can intercept another press.
  const toggle = () => {
    hasChosen.current = true
    setTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
