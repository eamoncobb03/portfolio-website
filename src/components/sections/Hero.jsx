import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
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
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
        <span className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
          Current project
        </span>
      </div>

      <p className="mt-4 flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em]">
        {currentProject.name}
        {live && (
          <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-signal" />
        )}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
        {currentProject.blurb}
      </p>

      <p className="mt-5 text-xs font-medium tracking-[0.06em] text-signal uppercase">
        {live ? 'View project' : currentProject.stage}
      </p>
    </TiltCard>
  )
}

export default function Hero() {
  return (
    <section className="flex min-h-svh items-center pt-16">
      <Container className="grid items-center gap-12 py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">
            {site.eyebrow}
          </p>

          <h1 className="mt-5 text-[clamp(2.75rem,6.5vw,5rem)] leading-[0.98] font-bold tracking-[-0.035em]">
            {site.firstName}
            <br />
            <span className="highlight-mark">{site.lastName}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            {site.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-11 px-5">
              <a href="#experience">
                See experience
                <ArrowRightIcon data-icon="inline-end" />
              </a>
            </Button>

            <Button asChild variant="ghost" size="lg" className="h-11 px-4">
              <a href="#contact">Get in touch</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <CurrentProjectCard />
        </Reveal>
      </Container>
    </section>
  )
}
