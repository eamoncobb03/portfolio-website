import Container from './Container'
import { site } from '@/content'

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <Container className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>
          {site.firstName} {site.lastName}
          <span className="text-signal">.</span> {new Date().getFullYear()}
        </span>

        <div className="flex items-center gap-6">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
            Email
          </a>
          <a
            href={site.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={site.github.url}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  )
}
