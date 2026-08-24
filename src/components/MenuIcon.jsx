/**
 * A hamburger that folds into a close cross.
 *
 * Three drawn bars rather than swapping between two lucide glyphs: the point is
 * that the same three strokes travel to their new positions, which a crossfade
 * between separate icons cannot do. The outer two slide to the middle and
 * rotate onto each other, and the centre one fades as they arrive.
 *
 * The bars are positioned from the centre so that both states are symmetric,
 * and the rotation has nothing to correct for.
 */
export default function MenuIcon({ open }) {
  return (
    <span aria-hidden className="menu-glyph" data-open={open || undefined}>
      <span />
      <span />
      <span />
    </span>
  )
}
