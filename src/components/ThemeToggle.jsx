import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      // The event is forwarded so the wipe can open from the press point.
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="glow-hover relative"
    >
      {/* Both icons are always mounted and cross-rotate, so the swap is a
          movement rather than one glyph blinking out and another in. */}
      <SunIcon className="theme-icon" data-shown={theme === 'dark'} />
      <MoonIcon className="theme-icon absolute" data-shown={theme === 'light'} />
    </Button>
  )
}
