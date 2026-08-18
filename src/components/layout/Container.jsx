import { cn } from '@/lib/utils'

// The one place the page's width and gutters are defined.
export default function Container({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-6 md:px-10', className)}>{children}</div>
}
