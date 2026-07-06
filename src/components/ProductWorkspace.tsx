import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, PhoneCall, Bot, ArrowRight, Sparkles } from 'lucide-react'
import Container from './Container'
import { conversations, customerFields, activityEvents, workspaceNav, workspaceAnnotations } from '../data/content'

export default function ProductWorkspace() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="platform" className="relative bg-page py-20 md:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[600px] -translate-y-1/2 bg-gradient-to-b from-transparent via-surface-2/30 to-transparent" aria-hidden="true" />

      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            Built to keep every customer conversation moving.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary text-pretty">
            One workspace for conversations, customer context, AI actions, and follow-up.
          </p>
        </div>

        <motion.div
          ref={sectionRef}
          className="relative mt-14 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative hidden lg:block" style={{ perspective: '2000px' }}>
            <div
              className="relative transition-transform duration-700"
              style={{
                transform: inView && !reduceMotion ? 'rotateX(2deg) rotateY(-1deg)' : 'none',
                transformStyle: 'preserve-3d',
              }}
            >
              <WorkspaceFrame />
            </div>
            <Annotations inView={inView} reduceMotion={reduceMotion} />
          </div>

          <div className="lg:hidden">
            <WorkspaceFrame />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function Annotations({ inView, reduceMotion }: { inView: boolean; reduceMotion: boolean | null }) {
  const positions = [
    { top: '6%', left: '-10%' },
    { top: '44%', right: '-10%' },
    { top: '82%', left: '-4%' },
  ]

  return (
    <>
      {workspaceAnnotations.map((label, i) => (
        <motion.div
          key={label}
          className="absolute z-20 hidden items-center gap-2 rounded-lg border border-line bg-surface/95 px-3 py-2 text-[12px] font-medium text-ink-secondary shadow-float backdrop-blur-sm xl:flex"
          style={positions[i]}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.6 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-surface">
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          {label}
        </motion.div>
      ))}
    </>
  )
}

function WorkspaceFrame() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-line bg-surface shadow-lifted">
      <div className="flex items-center justify-between border-b border-line bg-surface-2/50 px-5 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <span className="text-[10px] font-bold text-primary">B</span>
          </div>
          <span className="text-[13px] font-medium text-ink-secondary">base360</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-[12px] text-ink-muted">Workspace</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <nav className="flex shrink-0 flex-row overflow-x-auto border-b border-line bg-surface-2/30 p-2 lg:w-[180px] lg:flex-col lg:border-b-0 lg:border-r lg:overflow-visible" aria-label="Workspace navigation">
          {workspaceNav.map((item, i) => (
            <button
              key={item}
              className={`flex shrink-0 items-center rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${i === 0 ? 'bg-violet-surface text-primary' : 'text-ink-secondary hover:bg-surface-2 hover:text-ink'} lg:w-full`}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex flex-[1.5] flex-col lg:flex-row">
          <div className="border-b border-line lg:w-[300px] lg:shrink-0 lg:border-b-0 lg:border-r">
            <div className="border-b border-line px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-ink-muted">Inbox</p>
                <span className="rounded-md bg-violet-surface px-1.5 py-0.5 text-[11px] font-semibold text-primary">{conversations.length}</span>
              </div>
            </div>
            <div className="divide-y divide-line">
              {conversations.map((c) => {
                const Icon = c.icon
                return (
                  <div key={c.id} className={`flex items-center gap-2.5 px-3.5 py-3 transition-colors hover:bg-surface-2/40 ${c.unread ? 'bg-violet-surface/30' : 'opacity-70'}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${c.unread ? 'bg-violet-surface text-primary' : 'bg-surface-2 text-ink-muted'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`truncate text-[13px] ${c.unread ? 'font-semibold text-ink' : 'font-medium text-ink-secondary'}`}>{c.person}</span>
                        {c.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                      </div>
                      <p className="truncate text-[12px] text-ink-muted">{c.preview}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-ink-muted">{c.time}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex-1 border-b border-line lg:border-b-0">
            <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-surface text-[12px] font-semibold text-primary">AC</div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">Alex Chen</p>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="h-3 w-3 text-ink-muted" />
                  <span className="text-[12px] text-ink-muted">TikTok → Instagram DM</span>
                </div>
              </div>
              <span className="rounded-md bg-violet-surface px-2 py-0.5 text-[11px] font-medium text-primary">High intent</span>
            </div>

            <div className="space-y-3 p-4">
              <div className="max-w-[88%]">
                <div className="rounded-xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5">
                  <p className="text-[14px] text-ink">How much is this?</p>
                </div>
                <p className="mt-1 text-[11px] text-ink-muted">Alex · TikTok · 2m ago</p>
              </div>

              <div className="ml-auto max-w-[88%]">
                <div className="rounded-xl rounded-br-sm bg-violet-surface px-3.5 py-2.5">
                  <p className="text-[14px] text-ink">Hi Alex! I&apos;ve sent the pricing details to your DMs. Let me know which option looks best.</p>
                </div>
                <p className="mt-1 text-right text-[11px] text-ink-muted">Base360 AI · 1m ago</p>
              </div>

              <div className="max-w-[88%]">
                <div className="rounded-xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5">
                  <p className="text-[14px] text-ink">The pro plan looks good. Is it available?</p>
                </div>
                <p className="mt-1 text-[11px] text-ink-muted">Alex · Instagram DM · now</p>
              </div>

              <div className="rounded-lg border border-primary/20 bg-violet-surface/40 p-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[13px] font-semibold text-primary">AI suggestion</span>
                  <span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Score 92</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">
                  Reply with feature comparison and check availability. High buying intent detected — recommend scheduling a demo.
                </p>
                <div className="mt-2.5 flex gap-2">
                  <button type="button" className="rounded-md bg-primary px-3 py-1.5 text-[12px] font-medium text-white">Send reply</button>
                  <button type="button" className="rounded-md border border-line px-3 py-1.5 text-[12px] font-medium text-ink-secondary">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 lg:w-[280px] lg:border-l lg:border-line">
          <div className="border-b border-line p-4">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-ink-muted">Customer</p>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-surface text-[13px] font-semibold text-primary">AC</div>
              <div>
                <p className="text-[14px] font-semibold text-ink">Alex Chen</p>
                <p className="text-[12px] text-ink-muted">alex.c@example.com</p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {customerFields.map((field) => (
                <div key={field.label} className="flex items-center justify-between">
                  <span className="text-[12px] text-ink-muted">{field.label}</span>
                  <span className={`text-[13px] font-medium ${field.accent === 'violet' ? 'text-primary' : field.accent === 'success' ? 'text-success' : 'text-ink'}`}>{field.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-primary/20 bg-violet-surface/30 p-3">
              <p className="mb-1 text-[11px] font-medium text-ink-muted">Next action</p>
              <div className="flex items-center gap-1.5">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
                <span className="text-[13px] font-medium text-primary">Schedule demo call</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-ink-muted">Activity</p>
            <div className="space-y-2.5">
              {activityEvents.map((evt) => {
                const Icon = evt.icon
                return (
                  <div key={evt.id} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${evt.done ? 'bg-success/10 text-success' : 'bg-surface-2 text-ink-muted'}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] ${evt.done ? 'text-ink' : 'text-ink-secondary'}`}>{evt.action}</p>
                      <p className="text-[11px] text-ink-muted">{evt.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line bg-surface-2/30 px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span className="text-[12px] text-ink-secondary">AI agent online · 6 active conversations</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <PhoneCall className="h-3 w-3 text-ink-muted" />
          <span className="text-[12px] text-ink-muted">AI call scheduled · Tomorrow 2pm</span>
        </div>
      </div>
    </div>
  )
}
