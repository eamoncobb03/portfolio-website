import { ArrowRightIcon, ArrowUpRightIcon, ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Container from '@/components/layout/Container'
import Reveal from '@/components/Reveal'
import TiltCard from '@/components/TiltCard'
import { currentProject, site } from '@/content'

function CurrentProjectCard() {
  const live = currentProject?.href
  const external = live && currentProject.href.startsWith('http')

  // When there's somewhere to go, the card *is* the link. That beats laying a
  // stretched anchor over a transformed element, where the clickable area and
  // the painted card drift apart as the card tilts.
  const linkProps = live
    ? { as: 'a', href: currentProject.href, ...(external && { target: '_blank', rel: 'noreferrer' }) }
    : {}

  return (
    <TiltCard
      {...linkProps}
      className="rounded-2xl border border-(--tilt-border) bg-card p-6"
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="pulse-dot size-1.5 rounded-full bg-primary" />
        <span className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
          Current project
        </span>
      </div>

      <p className="mt-4 flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em]">
        {currentProject.title}
        {live && (
          <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
        )}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
        {currentProject.blurb}
      </p>

      <p className="mt-5 text-xs font-medium tracking-[0.06em] text-signal uppercase">
        {live ? 'View project' : currentProject.status}
      </p>
    </TiltCard>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center pt-16">
      <Container className="grid items-center gap-12 py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div>
          <Reveal variant="mask">
            <p className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">
              {site.eyebrow}
            </p>
          </Reveal>

          {/* Each line wipes up from behind its own clip, one after the other,
              which is why the name is split across two Reveals rather than
              being one block with a <br>. */}
          <h1 className="mt-5 text-[clamp(3.25rem,9vw,7rem)] leading-[0.92] font-bold tracking-[-0.045em]">
            <Reveal variant="mask" delay={90}>
              {site.firstName}
            </Reveal>
            <Reveal variant="mask" delay={180}>
              <span className="highlight-mark">{site.lastName}</span>
              <span className="text-signal">.</span>
            </Reveal>
          </h1>

          <Reveal delay={340}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
              {site.bio}
            </p>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group/cta h-11 px-5">
                <a href="#experience">
                  See experience
                  <ArrowRightIcon
                    data-icon="inline-end"
                    className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
                  />
                </a>
              </Button>

              <Button asChild variant="ghost" size="lg" className="h-11 px-4">
                <a href="#contact">Get in touch</a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={260}>
          <CurrentProjectCard />
        </Reveal>
      </Container>

      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-signal md:flex"
      >
        <span className="text-xs tracking-[0.16em] uppercase">Scroll</span>
        <ChevronDownIcon className="size-4 animate-bounce" />
      </a>
    </section>
  )
}
