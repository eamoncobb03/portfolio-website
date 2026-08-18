import { GraduationCapIcon } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { education, roles } from '@/content'

function SubHeading({ children }) {
  return (
    <h3 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </h3>
  )
}

function Node({ current }) {
  return (
    <span
      aria-hidden
      className={`absolute top-1.5 left-0 size-2.5 rounded-full border-2 ${
        current ? 'border-primary bg-primary' : 'border-border bg-card'
      }`}
    />
  )
}

function Row({ year, title, org, current, highlights }) {
  return (
    <div className="relative pb-9 pl-7 last:pb-0">
      <Node current={current} />

      <p className="font-mono text-xs text-muted-foreground tabular-nums">{year}</p>

      <p className="mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="text-base font-semibold tracking-[-0.01em]">{title}</span>
        <span className="text-sm text-muted-foreground">{org}</span>

        {current && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-signal">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            Current
          </span>
        )}
      </p>

      {highlights?.length > 0 && (
        <ul className="mt-2.5 flex flex-col gap-1.5">
          {highlights.map((line) => (
            <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-signal" />
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Work is a sequence, so it keeps the connecting line. Education isn't one
// any more, which is why it doesn't use this.
function Track({ children }) {
  return (
    <div className="relative mt-6">
      <div aria-hidden className="absolute top-2.5 bottom-3 left-1.5 w-px bg-border" />
      {children}
    </div>
  )
}

// One finished degree reads as a credential, not a timeline: a single card
// stating what it is and that it's done, rather than a dot on a line that
// implies something is still running.
function EducationCard() {
  return (
    <div className="mt-6 rounded-xl border border-border bg-card/40 p-5">
      <div className="flex items-start gap-3.5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-signal">
          <GraduationCapIcon className="size-[1.15rem]" />
        </span>

        <div className="min-w-0">
          <p className="text-base font-semibold tracking-[-0.01em]">{education.degree}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {education.school}, {education.location}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-3.5">
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {education.years}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-signal">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          Graduated {education.graduated}
        </span>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
      <div>
        <Reveal>
          <SubHeading>Work</SubHeading>
        </Reveal>

        <Track>
          {roles.map((role, i) => (
            <Reveal key={`${role.org}-${role.year}`} delay={i * 70}>
              <Row {...role} />
            </Reveal>
          ))}
        </Track>
      </div>

      <div>
        <Reveal>
          <SubHeading>Education</SubHeading>
        </Reveal>

        <Reveal>
          <EducationCard />
        </Reveal>
      </div>
    </div>
  )
}
