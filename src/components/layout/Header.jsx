import { useState } from 'react'
import { ArrowUpRightIcon } from 'lucide-react'
import MenuIcon from '@/components/MenuIcon'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ThemeToggle from '@/components/ThemeToggle'
import Container from './Container'
import { nav, site } from '@/content'
import { useHeaderState } from '@/lib/useScrollState'

const SECTION_IDS = nav.map((item) => item.id)

// Stays a real link so it can be opened in a new tab, but on a plain click it
// scrolls rather than reloading the page. Hovering draws the same yellow
// stroke the hero puts under the surname, rather than recolouring the text.
function Wordmark({ className }) {
  const toTop = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return (
    <a
      href="/"
      onClick={toTop}
      className={`group font-semibold tracking-[-0.02em] text-foreground ${className ?? ''}`}
    >
      <span className="highlight-hover">
        {site.firstName} {site.lastName}
      </span>
      <span className="text-signal">.</span>
    </a>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { progressRef, scrolled, active } = useHeaderState(SECTION_IDS)
  const activeLabel = nav.find((item) => item.id === active)?.label ?? 'Portfolio'

  return (
    <header
      data-glow
      data-scrolled={scrolled || undefined}
      className="site-header fixed inset-x-0 top-0 z-[60] border-b border-border/60 bg-background"
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Wordmark className="text-base" />

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              // aria-current is the part screen readers use; the glow is the
              // part everyone else does.
              aria-current={active === item.id ? 'true' : undefined}
              data-active={active === item.id || undefined}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Sheet modal={false} open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="menu-trigger glow-hover size-10 md:hidden"
              >
                <MenuIcon open={open} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              aria-describedby={undefined}
              overlayClassName="menu-overlay pointer-events-none z-40"
              className="menu-panel gap-0 overflow-y-auto p-2 data-[side=right]:inset-y-auto data-[side=right]:top-[4.75rem] data-[side=right]:right-4 data-[side=right]:h-auto data-[side=right]:max-h-[calc(100svh-5.75rem)] data-[side=right]:w-[min(21rem,calc(100vw-2rem))] data-[side=right]:rounded-2xl data-[side=right]:border data-[side=right]:sm:max-w-[21rem]"
            >
              <SheetTitle className="sr-only">Site navigation</SheetTitle>

              <div className="menu-panel-heading">
                <div>
                  <span className="menu-panel-eyebrow">Navigate</span>
                  <p className="menu-panel-title">{activeLabel}</p>
                </div>
                <span className="menu-panel-count">
                  {String(nav.length).padStart(2, '0')} sections
                </span>
              </div>

              <nav aria-label="Sections" className="menu-nav">
                {nav.map((item, i) => (
                  <SheetClose asChild key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active === item.id ? 'location' : undefined}
                      data-active={active === item.id || undefined}
                      className="menu-item"
                    >
                      <span className="menu-item-index">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="menu-item-label">{item.label}</span>
                      <ArrowUpRightIcon className="menu-item-arrow" />
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="menu-footer">
                <a href={`mailto:${site.email}`} className="menu-footer-link">
                  <span className="menu-footer-copy">
                    <span className="menu-footer-kicker">Get in touch</span>
                    <span className="menu-footer-email">{site.email}</span>
                  </span>
                  <ArrowUpRightIcon className="menu-footer-arrow" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>

      {/* Sits on the header's own bottom edge, so it reads as the bar filling
          rather than a separate strip of UI. Scaled from the left instead of
          animating width, which keeps it off the layout path entirely. */}
      <div ref={progressRef} aria-hidden className="scroll-progress" />
    </header>
  )
}
