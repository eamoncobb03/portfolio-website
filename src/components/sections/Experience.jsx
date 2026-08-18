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

function Row({ year, title, org, current, highlights }) {
  return (
    <div className="timeline-row group relative pl-10">
      {/* The node sits on the spine. The current role gets a halo that pulses,
          so the eye lands on where he is now before reading back through. */}
      <span
        aria-hidden
        className={`absolute top-1 left-0 size-3.5 -translate-x-1/2 rounded-full border-2 transition-colors duration-300 ${
          current
            ? 'pulse-ring border-primary bg-primary'
            : 'border-border bg-card group-hover:border-signal'
        }`}
        style={{ left: '0.4375rem' }}
      />

      <p className="font-mono text-sm tracking-[0.08em] text-muted-foreground tabular-nums">
        {year}
      </p>

      <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
        <span className="text-xl font-semibold tracking-[-0.015em] transition-colors duration-300 group-hover:text-signal sm:text-2xl">
          {title}
        </span>
        <span className="text-base text-muted-foreground">{org}</span>

        {current && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-signal">
            Current
          </span>
        )}
      </p>

      {highlights?.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {highlights.map((line) => (
            <li key={line} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
              <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-signal" />
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Work is a sequence, so it keeps the connecting line. Education isn't one
// any more, which is why it doesn't use this. The spine is a gradient that
// fades at both ends rather than a hard rule, and scales in from the top the
// first time the track is seen.
function Track({ children }) {
  return (
    // Spacing lives here rather than on the rows: each row is wrapped in its
    // own Reveal, which makes every one of them a :last-child, so a
    // `last:pb-0` on the row would zero the gap on all of them.
    <div className="relative mt-8 flex flex-col gap-11">
      <Reveal as="span" variant="spine" className="timeline-spine" aria-hidden />
      {children}
    </div>
  )
}

// One finished degree reads as a credential, not a timeline: a single card
// stating what it is and that it's done, rather than a dot on a line that
// implies something is still running.
function EducationCard() {
  return (
    <div className="group mt-8 rounded-xl border border-border bg-card/40 p-5 transition-colors duration-300 hover:border-signal/40">
      <div className="flex items-start gap-3.5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-signal transition-transform duration-300 group-hover:scale-105">
          <GraduationCapIcon className="size-5" />
        </span>

        <div className="min-w-0">
          <p className="text-lg font-semibold tracking-[-0.01em]">{education.degree}</p>
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
    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
      <div>
        <Reveal>
          <SubHeading>Work</SubHeading>
        </Reveal>

        <Track>
          {roles.map((role, i) => (
            <Reveal key={`${role.org}-${role.year}`} variant="left" delay={i * 90}>
              <Row {...role} />
            </Reveal>
          ))}
        </Track>
      </div>

      <div>
        <Reveal>
          <SubHeading>Education</SubHeading>
        </Reveal>

        <Reveal variant="scale">
          <EducationCard />
        </Reveal>
      </div>
    </div>
  )
}
