import { motion } from 'framer-motion'
import { MessageCircle, PhoneCall, Bot, ArrowRight } from 'lucide-react'
import Container from './Container'
import { conversations, customerFields, activityEvents, workspaceNav } from '../data/content'

export default function ProductWorkspace() {
  return (
    <section id="platform" className="bg-page py-20 md:py-28 lg:py-32">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            Built to keep every customer conversation moving.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary text-pretty">
            One workspace for conversations, customer context, AI actions, and follow-up.
          </p>
        </div>

        {/* Workspace UI */}
        <motion.div
          className="mt-14 md:mt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden rounded-[16px] border border-line bg-surface shadow-lifted">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-line bg-surface-2/50 px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                  <span className="text-[9px] font-bold text-primary">B</span>
                </div>
                <span className="text-[12px] font-medium text-ink-secondary">base360</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-[11px] text-ink-muted">Workspace</span>
              </div>
            </div>

            {/* Body: 3-panel layout */}
            <div className="flex flex-col lg:flex-row">
              {/* Left nav */}
              <nav className="flex shrink-0 flex-row overflow-x-auto border-b border-line bg-surface-2/30 p-2 lg:w-[180px] lg:flex-col lg:border-b-0 lg:border-r lg:overflow-visible" aria-label="Workspace navigation">
                {workspaceNav.map((item, i) => (
                  <button
                    key={item}
                    className={`flex shrink-0 items-center rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                      i === 0 ? 'bg-violet-surface text-primary' : 'text-ink-secondary hover:bg-surface-2 hover:text-ink'
                    } lg:w-full`}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </nav>

              {/* Center: Conversation list + active conversation */}
              <div className="flex flex-[1.5] flex-col lg:flex-row">
                {/* Inbox list */}
                <div className="border-b border-line lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-r">
                  <div className="border-b border-line px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-muted">Inbox</p>
                      <span className="rounded-md bg-violet-surface px-1.5 py-0.5 text-[10px] font-semibold text-primary">{conversations.length}</span>
                    </div>
                  </div>
                  <div className="divide-y divide-line">
                    {conversations.map((c) => {
                      const Icon = c.icon
                      return (
                        <div
                          key={c.id}
                          className={`flex items-center gap-2.5 px-3 py-2.5 transition-colors hover:bg-surface-2/40 ${c.unread ? '' : 'opacity-70'}`}
                        >
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${c.unread ? 'bg-violet-surface text-primary' : 'bg-surface-2 text-ink-muted'}`}>
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`truncate text-[12px] ${c.unread ? 'font-semibold text-ink' : 'font-medium text-ink-secondary'}`}>{c.person}</span>
                              {c.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                            </div>
                            <p className="truncate text-[11px] text-ink-muted">{c.preview}</p>
                          </div>
                          <span className="shrink-0 text-[10px] text-ink-muted">{c.time}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Active conversation */}
                <div className="flex-1 border-b border-line lg:border-b-0">
                  <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-surface text-[11px] font-semibold text-primary">AC</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-ink">Alex Chen</p>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-3 w-3 text-ink-muted" />
                        <span className="text-[11px] text-ink-muted">TikTok → Instagram DM</span>
                      </div>
                    </div>
                    <span className="rounded-md bg-violet-surface px-2 py-0.5 text-[10px] font-medium text-primary">High intent</span>
                  </div>

                  <div className="space-y-3 p-4">
                    {/* Inbound comment */}
                    <div className="max-w-[88%]">
                      <div className="rounded-xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5">
                        <p className="text-[13px] text-ink">How much is this?</p>
                      </div>
                      <p className="mt-1 text-[10px] text-ink-muted">Alex · TikTok · 2m ago</p>
                    </div>

                    {/* AI reply */}
                    <div className="ml-auto max-w-[88%]">
                      <div className="rounded-xl rounded-br-sm bg-violet-surface px-3.5 py-2.5">
                        <p className="text-[13px] text-ink">Hi Alex! I&apos;ve sent the pricing details to your DMs. Let me know which option looks best.</p>
                      </div>
                      <p className="mt-1 text-right text-[10px] text-ink-muted">Base360 AI · 1m ago</p>
                    </div>

                    {/* Customer reply */}
                    <div className="max-w-[88%]">
                      <div className="rounded-xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5">
                        <p className="text-[13px] text-ink">The pro plan looks good. Is it available?</p>
                      </div>
                      <p className="mt-1 text-[10px] text-ink-muted">Alex · Instagram DM · now</p>
                    </div>

                    {/* AI suggestion */}
                    <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                      <div className="flex items-center gap-1.5">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[12px] font-medium text-primary">AI suggestion</span>
                      </div>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-secondary">
                        Reply with feature comparison and check availability. Lead score: 92 — high buying intent detected.
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button type="button" className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-medium text-white">Send reply</button>
                        <button type="button" className="rounded-md border border-line px-3 py-1.5 text-[11px] font-medium text-ink-secondary">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Customer intelligence + activity */}
              <div className="shrink-0 lg:w-[280px] lg:border-l lg:border-line">
                {/* Customer panel */}
                <div className="border-b border-line p-4">
                  <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-ink-muted">Customer</p>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-surface text-[13px] font-semibold text-primary">AC</div>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">Alex Chen</p>
                      <p className="text-[11px] text-ink-muted">alex.c@example.com</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {customerFields.map((field) => (
                      <div key={field.label} className="flex items-center justify-between">
                        <span className="text-[11px] text-ink-muted">{field.label}</span>
                        <span className={`text-[12px] font-medium ${
                          field.accent === 'violet' ? 'text-primary' : field.accent === 'success' ? 'text-success' : 'text-ink'
                        }`}>
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-lg border border-line bg-surface-2/40 p-3">
                    <p className="mb-1 text-[11px] font-medium text-ink-muted">Next action</p>
                    <div className="flex items-center gap-1.5">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <span className="text-[12px] font-medium text-primary">Schedule demo call</span>
                    </div>
                  </div>
                </div>

                {/* Activity timeline */}
                <div className="p-4">
                  <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-ink-muted">Activity</p>
                  <div className="space-y-2.5">
                    {activityEvents.map((evt) => {
                      const Icon = evt.icon
                      return (
                        <div key={evt.id} className="flex items-start gap-2.5">
                          <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                            evt.done ? 'bg-success/10 text-success' : 'bg-surface-2 text-ink-muted'
                          }`}>
                            <Icon className="h-3 w-3" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-[12px] ${evt.done ? 'text-ink' : 'text-ink-secondary'}`}>{evt.action}</p>
                            <p className="text-[10px] text-ink-muted">{evt.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between border-t border-line bg-surface-2/30 px-5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="text-[11px] text-ink-secondary">AI agent online · 6 active conversations</span>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <PhoneCall className="h-3 w-3 text-ink-muted" />
                <span className="text-[11px] text-ink-muted">AI call scheduled · Tomorrow 2pm</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
