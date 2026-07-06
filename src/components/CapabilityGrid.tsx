import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Mail, PhoneCall, Smartphone, Globe, Send, Zap, User, PhoneCall as PhoneIcon, CheckCircle2, Bot, ArrowRight } from 'lucide-react'
import Container from './Container'

const channels = [
  { name: 'TikTok', icon: MessageCircle },
  { name: 'Instagram', icon: MessageCircle },
  { name: 'WhatsApp', icon: Globe },
  { name: 'SMS', icon: Smartphone },
  { name: 'Email', icon: Mail },
  { name: 'Voice', icon: PhoneCall },
]

const inboxItems = [
  { person: 'Alex Chen', preview: 'How much is this?', channel: 'TikTok', time: '2m', unread: true },
  { person: 'Sam Rivera', preview: 'Is this still available?', channel: 'IG', time: '8m', unread: true },
  { person: 'Jordan Lee', preview: 'Thanks for the info!', channel: 'WA', time: '23m', unread: false },
  { person: 'Priya Sharma', preview: 'Looking forward to the demo', channel: 'Email', time: '1h', unread: false },
]

const agentActions = [
  { label: 'Reply generated', done: true, icon: Send },
  { label: 'Intent qualified — High', done: true, icon: Zap },
  { label: 'CRM contact created', done: true, icon: User },
  { label: 'AI call scheduled', done: true, icon: PhoneIcon },
  { label: 'Campaign activated', done: false, icon: Mail },
  { label: 'Human handoff ready', done: false, icon: ArrowRight },
]

const followUpSteps = [
  { label: 'Comment reply', status: 'done', time: '0.3s' },
  { label: 'DM follow-up', status: 'done', time: '1.1s' },
  { label: 'Qualification', status: 'done', time: '2.4s' },
  { label: 'AI voice call', status: 'active', time: 'now' },
  { label: 'Email nurture', status: 'pending', time: 'tomorrow' },
  { label: 'Demo scheduled', status: 'pending', time: 'Thu' },
]

const campaignSteps = [
  { name: 'Welcome', status: 'sent', channel: 'Email' },
  { name: 'Features', status: 'sent', channel: 'SMS' },
  { name: 'Case study', status: 'ready', channel: 'Email' },
  { name: 'Demo invite', status: 'scheduled', channel: 'Voice' },
  { name: 'Follow-up', status: 'scheduled', channel: 'Email' },
]

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

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">

          {/* ── Capability 1: Unified inbox (6 cols) ── */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-6 md:p-7">
            <CapabilityHeader
              icon={<MessageCircle className="h-4 w-4 text-primary" />}
              title="Unified inbox"
              description="Bring comments, DMs, WhatsApp, SMS, email, and calls into one shared workspace."
            />
            {/* Channel filters */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {channels.map((ch) => {
                const Icon = ch.icon
                return (
                  <div key={ch.name} className="flex items-center gap-1.5 rounded-md border border-line bg-surface-2/40 px-2.5 py-1.5">
                    <Icon className="h-3 w-3 text-ink-muted" />
                    <span className="text-[11px] font-medium text-ink-secondary">{ch.name}</span>
                  </div>
                )
              })}
            </div>
            {/* Conversation list */}
            <div className="mt-4 space-y-1">
              {inboxItems.map((item) => (
                <div key={item.person} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${item.unread ? 'bg-violet-surface/50' : 'opacity-60'}`}>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-md ${item.unread ? 'bg-violet-surface text-primary' : 'bg-surface-2 text-ink-muted'}`}>
                    <MessageCircle className="h-3 w-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`truncate text-[12px] ${item.unread ? 'font-semibold text-ink' : 'font-medium text-ink-secondary'}`}>{item.person}</span>
                      {item.unread && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </div>
                    <p className="truncate text-[11px] text-ink-muted">{item.preview}</p>
                  </div>
                  <span className="text-[10px] text-ink-muted">{item.channel} · {item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Capability 2: Built-in CRM (6 cols) ── */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0.06 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-6 md:p-7">
            <CapabilityHeader
              icon={<User className="h-4 w-4 text-primary" />}
              title="Built-in CRM"
              description="Turn every meaningful conversation into an organized customer and opportunity."
            />
            {/* Customer record card */}
            <div className="mt-5 rounded-[12px] border border-line bg-surface-2/30 p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-surface text-[13px] font-semibold text-primary">AC</div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">Alex Chen</p>
                  <p className="text-[11px] text-ink-muted">Lead · Created 15m ago</p>
                </div>
                <span className="ml-auto rounded-md bg-violet-surface px-2 py-0.5 text-[10px] font-semibold text-primary">Score 92</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <span className="text-[10px] text-ink-muted">Intent</span>
                  <p className="text-[12px] font-semibold text-success">High</p>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted">Lead stage</span>
                  <p className="text-[12px] font-semibold text-primary">Qualified</p>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted">Owner</span>
                  <p className="text-[12px] font-medium text-ink">AI Agent</p>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted">Source</span>
                  <p className="text-[12px] font-medium text-ink">TikTok</p>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted">Campaign</span>
                  <p className="text-[12px] font-medium text-primary">Summer 2026</p>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted">Next action</span>
                  <p className="text-[12px] font-medium text-ink">Schedule demo</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Capability 3: AI agent orchestration (12 cols) ── */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0.12 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-12 md:p-8">
            <CapabilityHeader
              icon={<Bot className="h-4 w-4 text-primary" />}
              title="AI agent orchestration"
              description="Coordinate replies, qualification, voice calls, follow-up, and human handoffs."
            />
            {/* Orchestration flow */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              {/* Inputs */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Inputs</p>
                {['TikTok comment', 'Instagram DM', 'WhatsApp message'].map((input) => (
                  <div key={input} className="flex items-center gap-2 rounded-lg border border-line bg-surface-2/30 px-3 py-2">
                    <MessageCircle className="h-3 w-3 text-ink-muted" />
                    <span className="text-[12px] font-medium text-ink-secondary">{input}</span>
                  </div>
                ))}
              </div>

              {/* Core */}
              <div className="flex flex-col items-center gap-1 py-2 lg:px-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/20 bg-violet-surface">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <span className="text-[11px] font-medium text-primary">Base360 core</span>
                {/* Connectors (desktop) */}
                <div className="hidden lg:block">
                  <div className="flex items-center gap-1">
                    <div className="h-px w-6 bg-primary/30" />
                  </div>
                </div>
              </div>

              {/* Actions / results */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Actions</p>
                {agentActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <div key={action.label} className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${action.done ? 'border-success/20 bg-success/5' : 'border-line bg-surface-2/30 opacity-60'}`}>
                      <Icon className={`h-3 w-3 ${action.done ? 'text-success' : 'text-ink-muted'}`} />
                      <span className={`text-[12px] font-medium ${action.done ? 'text-ink' : 'text-ink-secondary'}`}>{action.label}</span>
                      {action.done && <CheckCircle2 className="ml-auto h-3 w-3 text-success" />}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* ── Capability 4: Continuous follow-up (6 cols) ── */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0.18 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-6 md:p-7">
            <CapabilityHeader
              icon={<PhoneCall className="h-4 w-4 text-primary" />}
              title="Continuous follow-up"
              description="Keep opportunities active across messages, calls, and scheduled next actions."
            />
            {/* Horizontal timeline */}
            <div className="mt-5">
              <div className="relative">
                <div className="absolute left-0 right-0 top-3.5 h-px bg-line" />
                <div className="relative flex items-center justify-between">
                  {followUpSteps.map((step) => (
                    <div key={step.label} className="flex flex-1 flex-col items-center text-center">
                      <div className={`h-7 w-7 rounded-full border-2 ${
                        step.status === 'done' ? 'border-success bg-success' :
                        step.status === 'active' ? 'border-primary bg-primary' :
                        'border-line bg-surface'
                      }`}>
                        {step.status === 'done' && <CheckCircle2 className="h-full w-full p-0.5 text-white" />}
                        {step.status === 'active' && <div className="h-2 w-2 rounded-full bg-white mx-auto mt-1.5" />}
                      </div>
                      <span className={`mt-2 text-[11px] font-medium ${step.status === 'pending' ? 'text-ink-muted' : 'text-ink'}`}>{step.label}</span>
                      <span className={`text-[10px] ${step.status === 'active' ? 'text-primary' : 'text-ink-muted'}`}>{step.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Capability 5: Marketing & subscribers (6 cols) ── */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduceMotion ? 0 : 0.24 }} className="rounded-[16px] border border-line bg-surface p-6 shadow-card lg:col-span-6 md:p-7">
            <CapabilityHeader
              icon={<Mail className="h-4 w-4 text-primary" />}
              title="Marketing & subscribers"
              description="Move qualified contacts into the right nurture journey from the same customer record."
            />
            {/* Campaign timeline */}
            <div className="mt-5 space-y-2">
              {campaignSteps.map((step) => (
                <div key={step.name} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 ${
                  step.status === 'sent' ? 'border-success/20 bg-success/5' :
                  step.status === 'ready' ? 'border-primary/20 bg-violet-surface' :
                  'border-line bg-surface-2/30 opacity-60'
                }`}>
                  <div className={`h-2 w-2 rounded-full ${
                    step.status === 'sent' ? 'bg-success' :
                    step.status === 'ready' ? 'bg-primary' :
                    'bg-ink-muted'
                  }`} />
                  <span className={`text-[12px] font-medium ${step.status === 'pending' ? 'text-ink-muted' : 'text-ink'}`}>{step.name}</span>
                  <span className="ml-auto text-[10px] text-ink-muted">{step.channel}</span>
                  <span className={`text-[10px] font-medium ${
                    step.status === 'sent' ? 'text-success' :
                    step.status === 'ready' ? 'text-primary' :
                    'text-ink-muted'
                  }`}>{step.status}</span>
                </div>
              ))}
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
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-surface">
        {icon}
      </div>
      <div>
        <h3 className="text-[20px] font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-1 text-[14px] leading-relaxed text-ink-secondary">{description}</p>
      </div>
    </div>
  )
}
