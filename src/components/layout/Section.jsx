import Container from './Container'
import Reveal from '@/components/Reveal'

export default function Section({ id, label, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border/60 py-20 md:py-28">
      <Container>
        <Reveal as="header">
          {/* The section name is the heading. The sentence under it is
              supporting copy, so it reads smaller and quieter. Capped well
              below the hero: two headings competing at the same size is what
              makes a page feel like a stack of title cards. */}
          <h2 className="text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] font-bold tracking-[-0.03em]">
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
