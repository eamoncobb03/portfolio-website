import { ArrowUpRightIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Reveal from '@/components/Reveal'
import { projects } from '@/content'

function ProjectCard({ project }) {
  const live = Boolean(project.href)
  const external = live && project.href.startsWith('http')

  // The highlight rides the ring rather than a border: shadcn's Card has no
  // border width, so a border colour on hover renders nothing at all.
  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:ring-primary/50">
      {project.preview && (
        // Card already knows how to seat a leading image (drops its own top
        // padding, rounds this to match), so it just has to be the first
        // child. The stretched link in CardTitle below covers the whole
        // card, this included, so the image is part of the same click
        // target rather than a dead zone above it.
        <img
          src={project.preview}
          alt={`${project.title} preview`}
          loading="lazy"
          // A fixed height rather than an aspect ratio: any ratio scales with
          // the card's own width, and on a wide card that meant the image
          // outweighed the two or three lines of text below it regardless of
          // which ratio was picked. This holds it to roughly the same weight
          // as that text at any card width, so it reads as a preview rather
          // than a banner.
          className="h-36 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      )}

      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-3 text-lg font-semibold tracking-[-0.01em]">
          {live ? (
            <a
              href={project.href}
              {...(external && { target: '_blank', rel: 'noreferrer' })}
              // Stretches the link over the whole card so the entire surface
              // is the hit target, without nesting anything inside an <a>.
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}

          {live && (
            <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
          )}
        </CardTitle>

        <CardDescription className="flex items-center gap-2.5">
          <span className="font-mono text-xs tabular-nums">{project.year}</span>

          {project.status && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-signal">
              <span aria-hidden className="pulse-dot size-1.5 rounded-full bg-primary" />
              {project.status}
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {project.blurb && (
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {project.blurb}
          </p>
        )}

        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Projects() {
  if (!projects.items.length) {
    return (
      <Reveal>
        {/* Held to the same width as the section's own copy. Stretched across
            the full grid it reads as a broken card rather than a note. */}
        <div className="max-w-2xl rounded-xl border border-dashed border-border p-8">
          <p className="text-base leading-relaxed text-muted-foreground text-pretty">
            {projects.blurb}
          </p>
        </div>
      </Reveal>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.items.map((project, i) => (
        <Reveal key={project.title} variant="scale" delay={i * 80} className="relative">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  )
}
