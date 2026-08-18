import Container from './Container'
import Reveal from '@/components/Reveal'

export default function Section({ id, index, label, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <Reveal as="header">
          {/* The divider, the index and the heading read as one mark rather
              than a rule with a title under it. The rule draws itself out from
              the number and fades before the right edge, so the section starts
              somewhere deliberate instead of being fenced off by a full-width
              line. */}
          <div className="section-rule flex items-center gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-signal tabular-nums">
              {String(index).padStart(2, '0')}
            </span>
            <span aria-hidden className="section-rule-line" />
          </div>

          {/* The section name is the heading. The sentence under it is
              supporting copy, so it reads smaller and quieter. Capped well
              below the hero: two headings competing at the same size is what
              makes a page feel like a stack of title cards. */}
          <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.035em]">
            {label}
          </h2>

          {title && (
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {title}
            </p>
          )}
        </Reveal>

        <div className="mt-12">{children}</div>
      </Container>
    </section>
  )
}
