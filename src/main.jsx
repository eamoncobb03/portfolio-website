import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ThemeProvider } from '@/context/ThemeContext'
import { Toaster } from '@/components/ui/sonner'
import App from '@/App'
import NotFound from '@/pages/NotFound'
import '@/index.css'

// No router library. A path -> component lookup instead of a growing chain
// of ternaries, so the next project page is a one-line addition here.
// /investmentplanner isn't listed: Vercel proxies that path to the standalone
// deployment before it ever reaches this app (see vercel.json), so this
// bundle never actually runs there in production.
const routes = {
  '/': App,
}

// Strips one trailing slash so routes still match with one, without
// treating '/' itself as empty.
const path = window.location.pathname.replace(/(.+)\/$/, '$1')
const Page = routes[path] ?? NotFound

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Page />
      <Toaster position="bottom-right" />
    </ThemeProvider>
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>,
)
