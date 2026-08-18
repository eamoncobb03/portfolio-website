import { useState } from 'react'
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from 'lucide-react'
import { TbBrandGithub, TbBrandLinkedin, TbMail } from 'react-icons/tb'
import { toast } from 'sonner'
import Reveal from '@/components/Reveal'
import { site } from '@/content'

/**
 * The async Clipboard API is the right call, but it refuses to write whenever
 * the document isn't focused, which real browsers hit often enough to matter.
 * Falls back to the deprecated selection-based copy, which has no such rule.
 * Returns whether anything actually landed on the clipboard.
 */
async function writeToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fall through.
  }

  const field = document.createElement('textarea')
  field.value = text
  // Off-screen rather than hidden: the selection has to be real to be copied.
  field.setAttribute('readonly', '')
  field.style.cssText = 'position:fixed;top:-9999px;opacity:0'
  document.body.append(field)

  try {
    field.select()
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
  }
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (await writeToClipboard(site.email)) {
      setCopied(true)
      toast('Copied to clipboard', { description: site.email, duration: 2000 })
      // Only the icon has a resting state to return to; the confirmation
      // itself is the toast's own concern once it's shown, not this
      // component's, so there's no timer here undoing it.
      setTimeout(() => setCopied(false), 2000)
    }
    // If both paths fail nothing changes, and the card's own mailto link
    // still works. Nothing to recover from.
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      // z-10 lifts this above the card's stretched link, so the button is
      // clickable rather than opening the mail client.
      className="relative z-10 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? (
        <CheckIcon className="size-4 text-signal" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  )
}

function ContactCard({ icon: Icon, label, value, href, external, brand, action }) {
  return (
    <div
      // The brand colour is scoped to the card as a variable so the icon, its
      // tile tint and the hover border all read from one value.
      style={{ '--brand': `var(${brand})` }}
      className="group relative flex items-center gap-3.5 rounded-xl border border-border bg-card/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-(--brand) hover:bg-card"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--brand)/10 text-(--brand)">
        <Icon className="size-[1.15rem]" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs tracking-[0.06em] text-muted-foreground uppercase">{label}</span>
        {/* Stretched link: the whole card is the hit target, without nesting
            the copy button inside an anchor. */}
        <a
          href={href}
          {...(external && { target: '_blank', rel: 'noreferrer' })}
          className="mt-0.5 block truncate text-sm font-medium after:absolute after:inset-0 after:content-['']"
        >
          {value}
        </a>
      </span>

      {action ?? (
        <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--brand)" />
      )}
    </div>
  )
}

export default function Contact() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Reveal>
        <ContactCard
          icon={TbMail}
          label="Email"
          value={site.email}
          href={`mailto:${site.email}`}
          brand="--brand-email"
          action={<CopyEmail />}
        />
      </Reveal>

      <Reveal delay={70}>
        <ContactCard
          icon={TbBrandLinkedin}
          label="LinkedIn"
          value={site.linkedin.label}
          href={site.linkedin.url}
          brand="--brand-linkedin"
          external
        />
      </Reveal>

      <Reveal delay={140}>
        <ContactCard
          icon={TbBrandGithub}
          label="GitHub"
          value={site.github.label}
          href={site.github.url}
          brand="--brand-github"
          external
        />
      </Reveal>
    </div>
  )
}
