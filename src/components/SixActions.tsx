import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, MessageCircle, Send } from 'lucide-react'

const actions = [
  {
    word: 'CAPTURE',
    number: '01',
    description: 'Every comment, DM, and message enters one inbox.',
    tags: ['Source: TikTok', 'Type: Comment', 'Inbox: New'],
    profile: { status: 'Incoming', intent: 'Unknown', lead: 'New', leadScore: '—', owner: 'Unassigned', campaign: '—', next: 'Respond' },
    conversation: { message: '"How much is this?"', channel: 'TikTok', direction: 'inbound' as const },
    aiAction: 'Waiting for inbound…',
  },
  {
    word: 'RESPOND',
    number: '02',
    description: 'AI replies publicly, then continues in a private DM.',
    tags: ['Public reply sent', 'DM opened', 'Context preserved'],
    profile: { status: 'Active', intent: 'Exploring', lead: 'Contacted', leadScore: '45', owner: 'AI Agent', campaign: '—', next: 'Understand' },
    conversation: { message: '"I\'ve sent the details to your DMs."', channel: 'TikTok → DM', direction: 'outbound' as const },
    aiAction: 'Reply generated · DM thread created',
  },
  {
    word: 'UNDERSTAND',
    number: '03',
    description: 'Questions answered. Intent signals extracted.',
    tags: ['Questions answered: 3', 'Interests: Pro plan', 'Engagement: High'],
    profile: { status: 'Active', intent: 'Interested', lead: 'Engaged', leadScore: '68', owner: 'AI Agent', campaign: '—', next: 'Qualify' },
    conversation: { message: '"Which option are you interested in?"', channel: 'Instagram DM', direction: 'outbound' as const },
    aiAction: 'Intent signals detected · Summary generated',
  },
  {
    word: 'QUALIFY',
    number: '04',
    description: 'Buying intent confirmed. Lead scored and prioritized.',
    tags: ['Score: 92', 'Budget: Confirmed', 'Timeline: This month'],
    profile: { status: 'Qualified', intent: 'High', lead: 'Scored', leadScore: '92', owner: 'AI Agent', campaign: '—', next: 'Follow up' },
    conversation: { message: '"I\'m interested in the pro plan."', channel: 'DM', direction: 'inbound' as const },
    aiAction: 'Intent: High · Qualification complete',
  },
  {
    word: 'FOLLOW UP',
    number: '05',
    description: 'AI voice call, SMS, and email — all from one thread.',
    tags: ['AI call: Completed', 'SMS: Sent', 'Email: Scheduled'],
    profile: { status: 'Engaged', intent: 'High', lead: 'Contacted', leadScore: '92', owner: 'AI Agent', campaign: 'Nurture', next: 'Convert' },
    conversation: { message: '"Yes, tomorrow works. Thanks!"', channel: 'Phone', direction: 'inbound' as const },
    aiAction: 'Call completed · Demo scheduled · Nurture active',
  },
  {
    word: 'CONVERT',
    number: '06',
    description: 'Marketing journey activated. Customer created.',
    tags: ['Campaign: Summer 2026', 'Stage: Active', 'Status: Won'],
    profile: { status: 'Won', intent: 'High', lead: 'Closed', leadScore: '98', owner: 'AI Agent', campaign: 'Active', next: '—' },
    conversation: { message: '"Signed. Looking forward to it!"', channel: 'Email', direction: 'inbound' as const },
    aiAction: 'Deal closed · Campaign running · Revenue booked',
  },
]

const profileFields = [
  { label: 'Status', key: 'status' as const },
  { label: 'Intent', key: 'intent' as const },
  { label: 'Lead stage', key: 'lead' as const },
  { label: 'Lead score', key: 'leadScore' as const },
  { label: 'Owner', key: 'owner' as const },
  { label: 'Campaign', key: 'campaign' as const },
  { label: 'Next action', key: 'next' as const },
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
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.3, rootMargin: '-80px 0px -30% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const active = actions[activeIndex]

  return (
    <section id="actions" className="relative bg-base-950 py-36 md:py-48">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[800px]">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.96] tracking-tight text-dark-mode-text text-balance">
            One conversation.
            <br />
            Six actions.
          </h2>
        </div>
      </div>

      {/* Desktop */}
      <div className="mt-20 hidden lg:block">
        <div className="mx-auto grid max-w-[1320px] grid-cols-[1fr_1.2fr] gap-12 px-16">
          {/* Action words — left */}
          <div className="relative">
            {/* Signal line */}
            <svg className="pointer-events-none absolute left-[34px] top-0 h-full w-0.5" aria-hidden="true">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2={`${(activeIndex / (actions.length - 1)) * 100}%`}
                stroke="#5c4bff"
                strokeWidth="1.5"
                initial={false}
              />
            </svg>

            <div className="space-y-0">
              {actions.map((a, i) => {
                const isActive = i === activeIndex
                const isPast = i < activeIndex
                return (
                  <div
                    key={a.word}
                    ref={(el) => { refs.current[i] = el }}
                    className="relative py-8 transition-all duration-500"
                  >
                    {/* Signal dot */}
                    <div className="absolute left-[27px] z-10">
                      <div className={`h-[14px] w-[14px] rounded-full border-2 transition-all duration-500 ${
                        isActive ? 'border-primary bg-primary shadow-lg shadow-primary/40 signal-dot-active' :
                        isPast ? 'border-success bg-success' :
                        'border-white/20 bg-transparent'
                      }`} />
                    </div>

                    <div className="flex items-start gap-6 pl-16">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                        isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' :
                        isPast ? 'bg-primary/10 text-primary' :
                        'bg-white/5 text-dark-mode-secondary/40'
                      }`}>
                        {isPast ? <Check className="h-4 w-4" /> : <span className="text-sm font-semibold">{i + 1}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <p className={`font-heading text-2xl font-medium tracking-tight transition-all duration-500 ${
                            isActive ? 'text-dark-mode-text' : isPast ? 'text-dark-mode-text/70' : 'text-dark-mode-text/40'
                          }`}>
                            {a.word}
                          </p>
                          <span className={`text-[11px] font-medium ${
                            isActive ? 'text-primary' : isPast ? 'text-dark-mode-secondary/50' : 'text-dark-mode-secondary/30'
                          }`}>
                            {a.number}/06
                          </span>
                        </div>
                        <p className={`mt-2 max-w-sm text-sm leading-relaxed transition-all duration-500 ${
                          isActive ? 'text-dark-mode-secondary' : isPast ? 'text-dark-mode-secondary/60' : 'text-dark-mode-secondary/35'
                        }`}>
                          {a.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {a.tags.map((tag) => (
                            <span key={tag} className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-all duration-500 ${
                              isActive ? 'bg-primary/10 text-primary' : isPast ? 'bg-white/5 text-dark-mode-secondary/50' : 'bg-white/5 text-dark-mode-secondary/30'
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Customer record — right */}
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <div className="flex h-full items-center">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="rounded-2xl border border-border-dark bg-base-900/80 p-6 shadow-xl shadow-black/20">
                  {/* Header */}
                  <div className="mb-5 flex items-center gap-3 border-b border-border-dark pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-base font-semibold text-primary">
                      AC
                    </div>
                    <div>
                      <p className="text-base font-medium text-dark-mode-text">Alex Chen</p>
                      <p className="text-xs text-dark-mode-secondary/60">alex.c@example.com</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                        active.profile.status === 'Won' ? 'bg-success/15 text-success' :
                        ['Qualified', 'Engaged'].includes(active.profile.status) ? 'bg-primary/15 text-primary' :
                        'bg-white/8 text-dark-mode-secondary/60'
                      }`}>
                        {active.profile.status}
                      </span>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    {profileFields.map((field) => (
                      <div key={field.label} className="flex items-center justify-between border-b border-border-dark pb-2">
                        <span className="text-xs text-dark-mode-secondary/50">{field.label}</span>
                        <span className={`text-xs font-medium ${
                          active.profile[field.key] === 'High' ? 'text-success' :
                          active.profile[field.key] === '92' || active.profile[field.key] === '98' ? 'text-success' :
                          active.profile[field.key] === 'Won' ? 'text-success' :
                          active.profile[field.key] && active.profile[field.key] !== '—' && active.profile[field.key] !== 'Unknown' && active.profile[field.key] !== 'Unassigned' && active.profile[field.key] !== 'New' && active.profile[field.key] !== 'Incoming' ? 'text-dark-mode-text' :
                          'text-dark-mode-secondary/35'
                        }`}>
                          {field.key === 'leadScore' && active.profile[field.key] !== '—' ? (
                            <span className="rounded bg-primary/10 px-1.5 py-0.5 font-semibold text-primary">{active.profile[field.key]}</span>
                          ) : active.profile[field.key] === 'Incoming' || active.profile[field.key] === 'New' ? (
                            <span className="text-dark-mode-secondary/50">{active.profile[field.key]}</span>
                          ) : (
                            active.profile[field.key]
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Latest interaction */}
                  <div className="mt-4 rounded-lg border border-border-dark bg-white/[0.03] p-3.5">
                    <div className="flex items-center gap-2 text-xs text-dark-mode-secondary/50">
                      {active.conversation.direction === 'inbound' ? (
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      <span>{active.conversation.channel}</span>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-dark-mode-text">{active.conversation.message}</p>
                  </div>

                  {/* AI action */}
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3.5 py-2.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-xs font-medium text-primary">{active.aiAction}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mt-16 px-6 lg:hidden">
        <div className="space-y-6">
          {actions.map((a, i) => (
            <div key={a.word} className="rounded-2xl border border-border-dark bg-base-900/50 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-heading text-xl font-medium text-dark-mode-text">{a.word}</p>
                  <p className="text-[11px] text-dark-mode-secondary/50">{a.number}/06</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-dark-mode-secondary/70">{a.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-primary/8 px-2 py-0.5 text-[10px] font-medium text-primary">{tag}</span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-border-dark bg-white/[0.02] p-3.5">
                {profileFields.slice(0, 6).map((field) => (
                  <div key={field.label}>
                    <span className="text-[10px] text-dark-mode-secondary/40">{field.label}</span>
                    <p className={`text-xs font-medium ${
                      field.key === 'leadScore' && a.profile[field.key] !== '—' ? 'text-primary' :
                      field.key === 'intent' && a.profile[field.key] === 'High' ? 'text-success' :
                      a.profile[field.key] === 'Won' ? 'text-success' :
                      'text-dark-mode-text'
                    }`}>
                      {a.profile[field.key]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
                <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span className="text-xs font-medium text-primary">{a.aiAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
