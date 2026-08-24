import { useState } from 'react'
import { ArrowUpRightIcon } from 'lucide-react'
import MenuIcon from '@/components/MenuIcon'
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
import { useHeaderState } from '@/lib/useScrollState'

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
  const { progress, scrolled, active } = useHeaderState(SECTION_IDS)

  return (
    <header
      data-glow
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
              <Button variant="ghost" size="icon-lg" aria-label="Open menu" className="glow-hover size-10">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            {/* The side variants set inset, height and width through
                data-[side=right] selectors, which outrank plain utilities, so
                the overrides that lift this into a floating rounded panel have
                to carry the same prefix to replace them rather than pile on
                top. showCloseButton is off because the trigger itself is now
                the close control. */}
            <SheetContent
              side="right"
              showCloseButton={false}
              className="menu-panel gap-0 data-[side=right]:inset-y-3 data-[side=right]:right-3 data-[side=right]:h-auto data-[side=right]:w-[min(19rem,82vw)] data-[side=right]:rounded-2xl data-[side=right]:border"
            >
              {/* Laid out like the header itself, wordmark left and the
                  control right, so the cross lands where the hamburger was and
                  the swap reads as one button changing rather than two. The
                  glyph mounts with the panel, so its bars fold into the cross
                  as the panel arrives. */}
              <SheetHeader className="flex-row items-center justify-between gap-3 pb-2">
                <SheetTitle asChild>
                  <SheetClose asChild>
                    <Wordmark className="text-base" />
                  </SheetClose>
                </SheetTitle>

                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Close menu"
                    className="glow-hover -mr-1 size-10 shrink-0"
                  >
                    <MenuIcon open />
                  </Button>
                </SheetClose>
              </SheetHeader>

              {/* Numbered to match the 01 / 02 rules the sections carry, so the
                  menu reads as the same document rather than a separate list.
                  Each row carries its index so the stagger below can key off
                  it in CSS instead of an inline delay per item. */}
              {/* Centred in whatever space is left between the wordmark and
                  the footer, rather than stacked at the top with a void under
                  it on a tall phone. */}
              <nav aria-label="Sections" className="flex flex-1 flex-col justify-center gap-1 px-3">
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
