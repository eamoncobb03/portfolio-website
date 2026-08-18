import { ArrowUpRightIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Reveal from '@/components/Reveal'
import { projects } from '@/content'

function ProjectCard({ project }) {
  const live = Boolean(project.href)
  const external = live && project.href.startsWith('http')

  return (
    <Card className="group h-full transition-colors hover:border-primary/50">
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
            <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-signal" />
          )}
        </CardTitle>

        <CardDescription className="font-mono text-xs tabular-nums">{project.year}</CardDescription>
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
        <Reveal key={project.title} delay={i * 80} className="relative">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  )
}
