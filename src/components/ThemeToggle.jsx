import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      // Matched to the menu button beside it, and both sized for a thumb
      // rather than a cursor.
      className="glow-hover relative size-10"
    >
      {/* Both icons are always mounted and cross-rotate, so the swap is a
          movement rather than one glyph blinking out and another in. */}
      <SunIcon className="theme-icon size-[1.15rem]" data-shown={theme === 'dark'} />
      <MoonIcon className="theme-icon absolute size-[1.15rem]" data-shown={theme === 'light'} />
    </Button>
  )
}
