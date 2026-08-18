import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const MAX_TILT_DEG = 7
// How far past the card the hover region reaches, in px. Set as a custom
// property on the wrapper so the CSS that draws that region and the maths
// that fades the effect across it can't drift apart.
const REACH_PX = 24

const clamp01 = (n) => Math.min(1, Math.max(0, n))

/**
 * A card that leans toward the cursor and carries a soft light across its
 * surface as the pointer moves, then eases back flat on leave.
 *
 * Two elements, and the split matters: the outer wrapper owns the pointer
 * handlers and is never transformed, while the inner card is the thing that
 * moves. Hovering near an edge used to tilt the card out from under the
 * cursor, which flattened it, which put it back under the cursor, which
 * tilted it again.
 *
 * The wrapper also reaches REACH_PX past the card, and the effect's strength
 * fades to nothing across that margin. A hover boundary always flips on and
 * off as the pointer wobbles across it; the fix is not to hide the boundary
 * but to make sure nothing is happening where it sits.
 *
 * Position is written straight to the DOM via refs rather than React state:
 * a tilt card lives or dies on how closely it tracks the pointer, and a
 * state update + re-render per mousemove is exactly the kind of jank that
 * gives the effect away.
 */
export default function TiltCard({ as: Tag = 'div', className, children, ...props }) {
  const wrap = useRef(null)
  const card = useRef(null)
  const frame = useRef(null)
  const inert = useRef(false)

  useEffect(() => {
    // Off entirely without a hovering pointer, or for anyone who has asked
    // for less motion. A tap on a touch screen fires one synthetic mousemove
    // and never a mouseleave, so without this the card tilts on tap and stays
    // tilted until you touch something else.
    inert.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    return () => frame.current && cancelAnimationFrame(frame.current)
  }, [])

  const set = (name, value) => card.current?.style.setProperty(name, value)

  const handleMove = (event) => {
    if (inert.current) return
    const el = card.current

    // offsetLeft/offsetWidth are layout values, so unlike getBoundingClientRect
    // they ignore the card's own transform. That matters: measuring the
    // transformed box would feed the current tilt back into the next angle.
    const origin = wrap.current.getBoundingClientRect()
    const left = origin.left + el.offsetLeft
    const top = origin.top + el.offsetTop
    const { offsetWidth: width, offsetHeight: height } = el

    // How far outside the card the pointer is, in px. Zero anywhere over the
    // card itself, rising to REACH_PX at the edge of the hover region.
    const outX = Math.max(0, left - event.clientX, event.clientX - (left + width))
    const outY = Math.max(0, top - event.clientY, event.clientY - (top + height))
    const lift = clamp01(1 - Math.hypot(outX, outY) / REACH_PX)

    const px = clamp01((event.clientX - left) / width)
    const py = clamp01((event.clientY - top) / height)

    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      set('--rx', `${(0.5 - py) * MAX_TILT_DEG}deg`)
      set('--ry', `${(px - 0.5) * MAX_TILT_DEG}deg`)
      set('--mx', `${px * 100}%`)
      set('--my', `${py * 100}%`)
      set('--lift', `${lift}`)
    })
  }

  const handleLeave = () => {
    if (inert.current) return
    if (frame.current) cancelAnimationFrame(frame.current)
    set('--lift', '0')
  }

  return (
    <Tag
      ref={wrap}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ '--tilt-reach': `${REACH_PX}px` }}
      className="tilt-wrap group block h-full"
      {...props}
    >
      <div ref={card} className={cn('tilt-card', className)}>
        <span aria-hidden className="tilt-card-glare" />
        <div className="relative z-10">{children}</div>
      </div>
    </Tag>
  )
}
