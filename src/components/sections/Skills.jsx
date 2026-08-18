import Reveal from '@/components/Reveal'
import { skillGroups } from '@/content'
import { skillIcons } from '@/lib/skill-icons'

function Skill({ name }) {
  const Icon = skillIcons[name]

  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/40 py-1.5 pr-3 pl-2.5 text-sm whitespace-nowrap">
      {Icon && <Icon className="size-[1.15em] shrink-0 text-signal" />}
      {name}
    </span>
  )
}

export default function Skills() {
  return (
    <div className="flex flex-col">
      {skillGroups.map((group, i) => (
        <Reveal
          key={group.label}
          delay={i * 60}
          className="grid gap-x-8 gap-y-3 border-t border-border/60 py-6 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr]"
        >
          <h3 className="text-sm font-semibold tracking-[-0.01em]">{group.label}</h3>

          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Skill key={item} name={item} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
