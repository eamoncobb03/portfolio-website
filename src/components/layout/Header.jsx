import { useState } from 'react'
import { MenuIcon } from 'lucide-react'
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Wordmark className="text-base" />

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle asChild>
                  <SheetClose asChild>
                    <Wordmark className="text-base" />
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Sections" className="flex flex-col px-2">
                {nav.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="rounded-md px-2 py-2.5 text-base transition-colors hover:bg-accent"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
