// The same two strokes stay mounted in both states, so this is a real morph
// rather than a hamburger being replaced by a separate close icon.
export default function MenuIcon({ open }) {
  return (
    <span aria-hidden className="menu-glyph" data-open={open || undefined}>
      <span />
      <span />
    </span>
  )
}
