import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const actions = [
  {
    word: 'CAPTURE',
    label: 'Capture',
    description: 'Every comment, DM, and message enters one inbox.\nNo channel left behind.',
    profile: { status: 'Incoming', intent: '—', lead: '—', campaign: '—', next: 'Respond' },
  },
  {
    word: 'RESPOND',
    label: 'Respond',
    description: 'AI replies publicly and continues the conversation privately.\nContext is never lost.',
    profile: { status: 'Active', intent: '—', lead: '—', campaign: '—', next: 'Understand' },
  },
  {
    word: 'UNDERSTAND',
    label: 'Understand',
    description: 'Questions are answered. Signals are detected.\nThe AI knows what the customer needs.',
    profile: { status: 'Active', intent: 'Exploring', lead: 'New', campaign: '—', next: 'Qualify' },
  },
  {
    word: 'QUALIFY',
    label: 'Qualify',
    description: 'Buying intent is confirmed. Lead score is calculated.\nHigh-intent contacts are prioritized.',
    profile: { status: 'Qualified', intent: 'High', lead: 'Scored', campaign: '—', next: 'Follow up' },
  },
  {
    word: 'FOLLOW UP',
    label: 'Follow up',
    description: 'AI voice calls, SMS, and email sequences keep the conversation moving.\nEvery touchpoint is tracked.',
    profile: { status: 'Engaged', intent: 'High', lead: 'Contacted', campaign: 'Nurture', next: 'Convert' },
  },
  {
    word: 'CONVERT',
    label: 'Convert',
    description: 'The contact enters the right marketing journey.\nThe conversation becomes a customer.',
    profile: { status: 'Won', intent: 'High', lead: 'Closed', campaign: 'Active', next: '—' },
  },
]

export default function SixActions() {
  const [activeIndex, setActiveIndex] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    actions.forEach((_, i) => {
      const el = refs.current[i]
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { threshold: 0.3, rootMargin: '-80px 0px -30% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const active = actions[activeIndex]

  return (
    <section id="actions" className="bg-base-950 py-36 md:py-48">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[800px]">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.96] tracking-tight text-dark-mode-text text-balance">
            One conversation.
            <br />
            Six actions.
          </h2>
        </div>
      </div>

      {/* Desktop: side-by-side */}
      <div className="mt-20 hidden lg:block">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-16 px-16">
          {/* Action words - left */}
          <div className="space-y-0">
            {actions.map((a, i) => {
              const isActive = i === activeIndex
              const isPast = i < activeIndex
              return (
                <div
                  key={a.word}
                  ref={(el) => { refs.current[i] = el }}
                  className={`py-10 transition-all duration-500 ${
                    !isActive && !isPast ? 'opacity-20' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                      isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : isPast
                          ? 'bg-primary/10 text-primary'
                          : 'bg-white/5 text-dark-mode-secondary/30'
                    }`}>
                      {isPast ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-lg font-semibold">{String(i + 1)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-heading text-3xl font-medium tracking-tight transition-all duration-500 ${
                        isActive ? 'text-dark-mode-text' : isPast ? 'text-dark-mode-text/60' : 'text-dark-mode-text/30'
                      }`}>
                        {a.word}
                      </p>
                      <p className={`mt-3 max-w-sm text-sm leading-relaxed transition-all duration-500 ${
                        isActive ? 'text-dark-mode-secondary' : 'text-dark-mode-secondary/40'
                      }`}>
                        {a.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Customer record - right (sticky) */}
          <div className="sticky top-28 h-[calc(100vh-12rem)]">
            <div className="flex h-full items-center">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <div className="rounded-2xl border border-border-dark bg-base-900/80 p-6 shadow-xl shadow-black/20">
                  <div className="mb-5 flex items-center gap-3 border-b border-border-dark pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-base font-semibold text-primary">
                      AC
                    </div>
                    <div>
                      <p className="text-base font-medium text-dark-mode-text">Alex Chen</p>
                      <p className="text-xs text-dark-mode-secondary/50">alex.c@example.com</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                        active.profile.status === 'Won' ? 'bg-success/15 text-success' :
                        ['Qualified', 'Engaged'].includes(active.profile.status) ? 'bg-primary/15 text-primary' :
                        'bg-white/5 text-dark-mode-secondary/50'
                      }`}>
                        {active.profile.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Intent', value: active.profile.intent },
                      { label: 'Lead stage', value: active.profile.lead },
                      { label: 'Campaign', value: active.profile.campaign },
                      { label: 'Next action', value: active.profile.next },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between border-b border-border-dark pb-2">
                        <span className="text-xs text-dark-mode-secondary/40">{item.label}</span>
                        <span className={`text-xs font-medium ${
                          item.value === 'High' ? 'text-success' :
                          item.value && item.value !== '—' ? 'text-dark-mode-text' : 'text-dark-mode-secondary/30'
                        }`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action indicator */}
                  <div className="mt-5 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2.5">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span className="text-xs font-medium text-primary">{active.word}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical sequence */}
      <div className="mt-16 px-6 lg:hidden">
        <div className="space-y-6">
          {actions.map((a, i) => (
            <div
              key={a.word}
              className="rounded-2xl border border-border-dark bg-base-900/50 p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </div>
                <p className="font-heading text-xl font-medium text-dark-mode-text">{a.word}</p>
              </div>
              <p className="text-sm leading-relaxed text-dark-mode-secondary/70">{a.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-border-dark bg-white/[0.02] p-3">
                {[
                  { label: 'Status', value: a.profile.status },
                  { label: 'Intent', value: a.profile.intent },
                  { label: 'Lead', value: a.profile.lead },
                  { label: 'Next', value: a.profile.next },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="text-[10px] text-dark-mode-secondary/40">{item.label}</span>
                    <p className="text-[11px] font-medium text-dark-mode-text">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
