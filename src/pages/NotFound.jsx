import { ArrowLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <div aria-hidden className="grid-ground" />

      <p className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">Error 404</p>

      <h1 className="mt-5 text-[clamp(2.25rem,5vw,3rem)] font-bold tracking-[-0.03em]">Nothing here</h1>

      <p className="mt-4 max-w-sm text-base text-muted-foreground">
        That page doesn&rsquo;t exist. It may have moved, or it was never here.
      </p>

      <Button asChild variant="outline" size="lg" className="mt-8 h-11 px-5">
        <a href="/">
          <ArrowLeftIcon data-icon="inline-start" />
          Back home
        </a>
      </Button>
    </main>
  )
}
