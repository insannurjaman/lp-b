import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Mail, PhoneCall, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react'
import Container from './Container'
import { OrbitCore, OrbitPath, OrbitPulse } from './Orbit'
import {
  capabilityChannels, capabilityInboxItems, agentActions, agentInputs,
  followUpSteps, campaignSteps,
} from '../data/content'

export default function CapabilityGrid() {
  const reduceMotion = useReducedMotion()

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }

  return (
    <section id="capabilities" className="bg-surface-2 py-20 md:py-28 lg:py-32">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            Everything your customer team needs.
            <br />
            Nothing disconnected.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary text-pretty">
            One platform replaces fragmented tools for inbox, CRM, automation, and marketing.
          </p>
        </div>

        {/* Asymmetric bento grid: 7/5, 12, 5/7 */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">

          {/* ── Row 1: Unified inbox (7 cols) + Built-in CRM (5 cols) ── */}

          {/* Unified inbox — 7 cols, denser horizontal UI */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-7 md:p-7">
            <CapabilityHeader
              icon={<MessageCircle className="h-4 w-4 text-primary" />}
              title="Unified inbox"
              description="Bring comments, DMs, WhatsApp, SMS, email, and calls into one shared workspace."
            />
            {/* Channel filters */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {capabilityChannels.map((ch) => {
                const Icon = ch.icon
                return (
                  <div key={ch.name} className="flex items-center gap-1.5 rounded-md border border-line bg-surface-2/40 px-2.5 py-1.5">
                    <Icon className="h-3.5 w-3.5 text-ink-muted" />
                    <span className="text-[12px] font-medium text-ink-secondary">{ch.name}</span>
                  </div>
                )
              })}
            </div>
            {/* Conversation list — denser, horizontal */}
            <div className="mt-4 space-y-1">
              {capabilityInboxItems.map((item) => (
                <div key={item.person} className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
                  item.unread ? 'border-primary/20 bg-violet-surface/60' : 'border-transparent opacity-80'
                }`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${item.unread ? 'bg-violet-surface text-primary' : 'bg-surface-2 text-ink-secondary'}`}>
                    <MessageCircle className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`truncate text-[14px] ${item.unread ? 'font-semibold text-ink' : 'font-medium text-ink-secondary'}`}>{item.person}</span>
                      {item.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                      {item.priority === 'high' && (
                        <span className="rounded bg-primary/10 px-1 py-0.5 text-[11px] font-semibold text-primary">HIGH</span>
                      )}
                    </div>
                    <p className="truncate text-[13px] text-ink-muted">{item.preview}</p>
                  </div>
                  <span className="shrink-0 text-[13px] text-ink-muted">{item.channel} - {item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Built-in CRM — 5 cols, structured customer profile */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0.06 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-5 md:p-7">
            <CapabilityHeader
              icon={<CapabilityCRMIcon />}
              title="Built-in CRM"
              description="Turn every meaningful conversation into an organized customer and opportunity."
            />
            {/* Customer record card */}
            <div className="mt-5 rounded-[12px] border border-line bg-surface-2/30 p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-surface text-[14px] font-semibold text-primary">AC</div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-ink">Alex Chen</p>
                  <p className="text-[13px] text-ink-muted">Lead - Created 15m ago</p>
                </div>
                <span className="rounded-md bg-violet-surface px-2.5 py-1 text-[12px] font-semibold text-primary">Score 92</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <span className="text-[13px] text-ink-muted">Intent</span>
                  <p className="text-[14px] font-semibold text-success">High</p>
                </div>
                <div>
                  <span className="text-[13px] text-ink-muted">Lead stage</span>
                  <p className="text-[14px] font-semibold text-primary">Qualified</p>
                </div>
                <div>
                  <span className="text-[13px] text-ink-muted">Owner</span>
                  <p className="text-[14px] font-medium text-ink">AI Agent</p>
                </div>
                <div>
                  <span className="text-[13px] text-ink-muted">Source</span>
                  <p className="text-[14px] font-medium text-ink">TikTok</p>
                </div>
                <div>
                  <span className="text-[13px] text-ink-muted">Campaign</span>
                  <p className="text-[14px] font-medium text-primary">Summer 2026</p>
                </div>
                <div>
                  <span className="text-[13px] text-ink-muted">Next action</span>
                  <p className="text-[14px] font-medium text-ink">Schedule demo</p>
                </div>
              </div>
              {/* Next action callout */}
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-violet-surface/40 px-3 py-2">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
                <span className="text-[13px] font-medium text-primary">High intent - schedule demo call</span>
              </div>
            </div>
          </motion.div>

          {/* ── Row 2: AI agent orchestration (12 cols) — signature orbit visual ── */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0.12 }} className="relative overflow-hidden rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-12 md:p-8">
            {/* Dotted grid backdrop */}
            <div className="dotted-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

            <div className="relative">
              <CapabilityHeader
                icon={<CapabilityAgentIcon />}
                title="AI agent orchestration"
                description="Coordinate replies, qualification, voice calls, follow-up, and human handoffs."
              />

              {/* Orbit orchestration visual */}
              <div className="mt-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">

                {/* Left: Inputs */}
                <div className="space-y-2">
                  <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-ink-muted">Channel inputs</p>
                  {agentInputs.map((input) => {
                    const Icon = input.icon
                    return (
                      <div key={input.label} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3.5 py-3 shadow-card">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-surface">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-[14px] font-medium text-ink">{input.label}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Center: Orbit core with paths */}
                <div className="relative flex flex-col items-center justify-center py-4 lg:px-8">
                  {/* Horizontal orbit path */}
                  <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 lg:block">
                    <OrbitPath variant="horizontal" active complete={false} />
                    <OrbitPulse active={!reduceMotion} variant="horizontal" duration={3} />
                  </div>

                  <OrbitCore size={112} active={!reduceMotion} complete={false} label="Base360 core" showPulse={!reduceMotion} />

                  {/* Surrounding AI task chips */}
                  <div className="mt-6 grid w-full max-w-[400px] grid-cols-2 gap-2">
                    {agentActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <div key={action.label} className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors ${
                          action.done ? 'border-success/25 bg-success/5' : 'border-line bg-surface-2/30 opacity-70'
                        }`}>
                          <Icon className={`h-3.5 w-3.5 ${action.done ? 'text-success' : 'text-ink-muted'}`} />
                          <span className={`text-[12px] font-medium ${action.done ? 'text-ink' : 'text-ink-secondary'}`}>{action.label}</span>
                          {action.done && <CheckCircle2 className="ml-auto h-3 w-3 text-success" />}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right: Outcomes */}
                <div className="space-y-2">
                  <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-ink-muted">Completed outcomes</p>
                  {agentActions.filter(a => a.done).map((action) => {
                    const Icon = action.icon
                    return (
                      <div key={action.label} className="flex items-center gap-2.5 rounded-lg border border-success/20 bg-success/5 px-3.5 py-3 shadow-card">
                        <Icon className="h-4 w-4 text-success" />
                        <span className="text-[14px] font-medium text-ink">{action.label}</span>
                        <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-success" />
                      </div>
                    )
                  })}
                  {/* Human handoff — controlled escalation */}
                  <div className="flex items-center gap-2.5 rounded-lg border border-primary/20 bg-violet-surface/30 px-3.5 py-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-[14px] font-medium text-primary">Human handoff ready</span>
                    <span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 text-[12px] font-medium text-primary">Escalate</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Row 3: Follow-up automation (5 cols) + Marketing (7 cols) ── */}

          {/* Follow-up automation — 5 cols, operational timeline */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0.18 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-5 md:p-7">
            <CapabilityHeader
              icon={<PhoneCall className="h-4 w-4 text-primary" />}
              title="Continuous follow-up"
              description="Keep opportunities active across messages, calls, and scheduled next actions."
            />
            {/* Operational timeline */}
            <div className="mt-6 space-y-2">
              {followUpSteps.map((step) => (
                <div key={step.label} className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors ${
                  step.status === 'done' ? 'border-success/20 bg-success/5' :
                  step.status === 'active' ? 'border-primary/20 bg-violet-surface' :
                  'border-line bg-surface-2/30 opacity-70'
                }`}>
                  <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    step.status === 'done' ? 'bg-success' :
                    step.status === 'active' ? 'bg-primary' :
                    'bg-ink-muted'
                  }`} />
                  <span className={`text-[13px] font-medium ${step.status === 'pending' ? 'text-ink-muted' : 'text-ink'}`}>{step.label}</span>
                  <span className={`ml-auto text-[12px] font-medium ${
                    step.status === 'active' ? 'text-primary' : 'text-ink-muted'
                  }`}>{step.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Marketing & subscribers — 7 cols, horizontal campaign progression */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0.24 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-7 md:p-7">
            <CapabilityHeader
              icon={<Mail className="h-4 w-4 text-primary" />}
              title="Marketing & subscribers"
              description="Move qualified contacts into the right nurture journey from the same customer record."
            />
            {/* Horizontal campaign progression */}
            <div className="mt-6">
              <div className="relative">
                {/* Base line */}
                <div className="absolute left-0 right-0 top-4 h-px bg-line" />
                {/* Progress line */}
                <motion.div
                  className="absolute left-0 top-4 h-px bg-success/40"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '60%' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: reduceMotion ? 0 : 1, ease: 'easeOut' }}
                />
                <div className="relative flex items-center justify-between">
                  {campaignSteps.map((step) => (
                    <div key={step.name} className="flex flex-1 flex-col items-center text-center">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                        step.status === 'sent' ? 'border-success bg-success text-white' :
                        step.status === 'ready' ? 'border-primary bg-violet-surface text-primary' :
                        'border-line bg-surface text-ink-muted'
                      }`}>
                        {step.status === 'sent' ? <CheckCircle2 className="h-4 w-4" /> :
                         step.status === 'ready' ? <Mail className="h-4 w-4" /> :
                         <Smartphone className="h-4 w-4" />}
                      </div>
                      <span className={`mt-2 text-[12px] font-medium ${step.status === 'scheduled' ? 'text-ink-muted' : 'text-ink'}`}>{step.name}</span>
                      <span className="text-[12px] text-ink-muted">{step.channel}</span>
                      <span className={`text-[12px] font-medium ${
                        step.status === 'sent' ? 'text-success' :
                        step.status === 'ready' ? 'text-primary' : 'text-ink-muted'
                      }`}>{step.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}

function CapabilityHeader({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-surface">
        {icon}
      </div>
      <div>
        <h3 className="text-[22px] font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-1 text-[14px] leading-relaxed text-ink-secondary">{description}</p>
      </div>
    </div>
  )
}

function CapabilityCRMIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="8" cy="5" r="2.5" stroke="#6657FF" strokeWidth="1.5" />
      <path d="M3 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="#6657FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CapabilityAgentIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="5" width="10" height="8" rx="2" stroke="#6657FF" strokeWidth="1.5" />
      <circle cx="8" cy="9" r="1.5" fill="#6657FF" />
      <path d="M8 5V3M5 9H3M13 9h-2" stroke="#6657FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
