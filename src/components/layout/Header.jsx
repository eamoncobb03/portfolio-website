import { useState } from 'react'
import { ArrowUpRightIcon, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ThemeToggle from '@/components/ThemeToggle'
import Container from './Container'
import { nav, site } from '@/content'
import { useActiveSection, useScrollProgress } from '@/lib/useScrollState'

const SECTION_IDS = nav.map((item) => item.id)

// Stays a real link so it can be opened in a new tab, but on a plain click it
// scrolls rather than reloading the page. Hovering draws the same yellow
// stroke the hero puts under the surname, rather than recolouring the text.
function Wordmark({ className }) {
  const toTop = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
  const { progress, scrolled } = useScrollProgress()
  const active = useActiveSection(SECTION_IDS)

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md transition-shadow duration-500 data-scrolled:shadow-[0_1px_0_0_var(--glow-line),0_8px_30px_-12px_var(--glow-cast)]"
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

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon-sm" aria-label="Open menu" className="glow-hover">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="menu-panel w-[min(20rem,85vw)] gap-0">
              <SheetHeader className="pb-2">
                <SheetTitle asChild>
                  <SheetClose asChild>
                    <Wordmark className="text-base" />
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>

              {/* Numbered to match the 01 / 02 rules the sections carry, so the
                  menu reads as the same document rather than a separate list.
                  Each row carries its index so the stagger below can key off
                  it in CSS instead of an inline delay per item. */}
              <nav aria-label="Sections" className="flex flex-col gap-1 px-3 pt-2">
                {nav.map((item, i) => (
                  <SheetClose asChild key={item.id}>
                    <a
                      href={`#${item.id}`}
                      data-active={active === item.id || undefined}
                      style={{ '--i': i }}
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

              <div className="mt-auto px-3 pb-4" style={{ '--i': nav.length }}>
                <span aria-hidden className="menu-rule" />
                <a href={`mailto:${site.email}`} className="menu-footer-link">
                  {site.email}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">{site.location}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>

      {/* Sits on the header's own bottom edge, so it reads as the bar filling
          rather than a separate strip of UI. Scaled from the left instead of
          animating width, which keeps it off the layout path entirely. */}
      <div aria-hidden className="scroll-progress" style={{ '--p': progress }} />
    </header>
  )
}
