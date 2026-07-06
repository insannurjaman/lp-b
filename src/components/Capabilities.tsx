import { MessageCircle, Globe, Smartphone, Mail, PhoneCall, Bot, User, ArrowRight, TrendingUp, ArrowDown } from 'lucide-react'

const channels = [
  { name: 'TikTok', icon: MessageCircle, active: true },
  { name: 'Instagram', icon: MessageCircle, active: true },
  { name: 'Facebook', icon: MessageCircle, active: true },
  { name: 'WhatsApp', icon: Globe, active: true },
  { name: 'SMS', icon: Smartphone, active: true },
  { name: 'Email', icon: Mail, active: true },
  { name: 'Voice', icon: PhoneCall, active: false },
]

const agentLog = [
  { action: 'Inbound detected — TikTok comment', status: 'done' as const, time: '0.3s' },
  { action: 'Reply generated — public response', status: 'done' as const, time: '1.1s' },
  { action: 'DM thread created — context carried', status: 'done' as const, time: '1.8s' },
  { action: 'Intent analysis — interest: pro plan', status: 'active' as const, time: '—' },
  { action: 'Lead scored — 92/100', status: 'pending' as const, time: '…' },
  { action: 'CRM contact created — Alex Chen', status: 'pending' as const, time: '…' },
  { action: 'Nurture campaign assigned', status: 'pending' as const, time: '…' },
]

const recordFields = [
  { label: 'Intent', value: 'High', highlight: true },
  { label: 'Lead score', value: '92', highlight: true },
  { label: 'Owner', value: 'AI Agent' },
  { label: 'Source', value: 'TikTok' },
  { label: 'Campaign', value: 'Summer 2026', accent: true },
  { label: 'Last touch', value: '2m ago' },
  { label: 'Next action', value: 'Schedule demo' },
]

const campaignSteps = [
  { name: 'Welcome', done: true, sent: true },
  { name: 'Features', done: true, sent: true },
  { name: 'Case study', done: true, sent: false },
  { name: 'Demo invite', done: false, sent: false },
  { name: 'Follow-up', done: false, sent: false },
  { name: 'Review', done: false, sent: false },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-base-950 py-36 md:py-48">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-medium leading-[0.96] tracking-tight text-dark-mode-text text-balance">
            One system.
            <br />
            Four connected capabilities.
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div className="mt-20 grid gap-5 lg:grid-cols-12">

          {/* ── Capability 1: Unified inbox (hero, 8 cols) ── */}
          <div className="rounded-2xl border border-border-dark bg-base-900/50 p-7 lg:col-span-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-mode-text">Unified inbox</h3>
                <p className="text-[11px] text-dark-mode-secondary/50">Every channel, one stream</p>
              </div>
            </div>

            {/* Channel bar */}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {channels.map((ch) => {
                const Icon = ch.icon
                return (
                  <div key={ch.name} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 ${
                    ch.active ? 'border-border-dark bg-white/[0.03]' : 'border-border-dark/40 bg-transparent opacity-40'
                  }`}>
                    <Icon className="h-3 w-3 text-dark-mode-secondary/60" aria-hidden="true" />
                    <span className="text-[10px] text-dark-mode-secondary/60">{ch.name}</span>
                  </div>
                )
              })}
            </div>

            {/* Inbox items */}
            <div className="space-y-1">
              {[
                { channel: 'TikTok', person: 'Alex Chen', preview: 'How much is this?', active: true, time: '30s' },
                { channel: 'Instagram', person: 'Sam Rivera', preview: 'Is this available?', active: false, time: '4m' },
                { channel: 'WhatsApp', person: 'Jordan Lee', preview: 'Thanks for the info!', active: false, time: '12m' },
                { channel: 'Facebook', person: 'Taylor Kim', preview: 'Do you ship internationally?', active: false, time: '1h' },
                { channel: 'Email', person: 'Morgan Diaz', preview: 'Meeting confirmed for Thursday', active: false, time: '2h' },
              ].map((item) => (
                <div key={item.person} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                  item.active ? 'bg-primary/[0.06] ring-1 ring-primary/20' : 'opacity-60 hover:opacity-80'
                }`}>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${
                    item.active ? 'bg-primary/15 text-primary' : 'bg-white/5 text-dark-mode-secondary/40'
                  }`}>
                    <MessageCircle className="h-3 w-3" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${item.active ? 'font-medium text-dark-mode-text' : 'text-dark-mode-secondary/60'}`}>
                        {item.person}
                      </span>
                      {item.active && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </div>
                    <p className="truncate text-[10px] text-dark-mode-secondary/40">{item.preview}</p>
                  </div>
                  <span className="text-[9px] text-dark-mode-secondary/30">{item.channel} · {item.time}</span>
                </div>
              ))}
            </div>

            {/* Footer — flow hint */}
            <div className="mt-4 flex items-center gap-1.5 text-[10px] text-dark-mode-secondary/30">
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
              <span>Routes to AI agents for processing</span>
            </div>
          </div>

          {/* ── Capability 2: AI agents (sidebar, 4 cols) ── */}
          <div className="rounded-2xl border border-border-dark bg-base-900/50 p-7 lg:col-span-4">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-mode-text">AI agents</h3>
                <p className="text-[11px] text-dark-mode-secondary/50">Execution log</p>
              </div>
            </div>

            {/* Agent execution log */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-border-dark" />

              <div className="space-y-0">
                {agentLog.map((step) => (
                  <div key={step.action} className="relative flex items-start gap-3 pb-3.5 last:pb-0">
                    {/* Dot */}
                    <div className="relative z-10 mt-1">
                      <div className={`h-[9px] w-[9px] rounded-full border-2 ${
                        step.status === 'done' ? 'border-success bg-success' :
                        step.status === 'active' ? 'border-primary bg-primary shadow-sm shadow-primary/40' :
                        'border-white/15 bg-transparent'
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs leading-snug ${
                          step.status === 'done' ? 'text-dark-mode-secondary/70' :
                          step.status === 'active' ? 'font-medium text-dark-mode-text' :
                          'text-dark-mode-secondary/30'
                        }`}>
                          {step.action}
                        </span>
                      </div>
                      <span className={`text-[9px] ${
                        step.status === 'done' ? 'text-dark-mode-secondary/40' :
                        step.status === 'active' ? 'text-primary' :
                        'text-dark-mode-secondary/20'
                      }`}>
                        {step.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer — flow hint */}
            <div className="mt-4 flex items-center gap-1.5 text-[10px] text-dark-mode-secondary/30">
              <ArrowDown className="h-3 w-3" aria-hidden="true" />
              <span>Writes structured data to CRM</span>
            </div>
          </div>

          {/* ── Capability 3: Built-in CRM (6 cols) ── */}
          <div className="rounded-2xl border border-border-dark bg-base-900/50 p-7 lg:col-span-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <User className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-mode-text">Built-in CRM</h3>
                <p className="text-[11px] text-dark-mode-secondary/50">Every conversation is a record</p>
              </div>
            </div>

            <div className="rounded-lg border border-border-dark bg-base-950/50 p-5">
              {/* Record header */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  AC
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-mode-text">Alex Chen</p>
                  <p className="text-[10px] text-dark-mode-secondary/50">Lead · Created 15m ago</p>
                </div>
              </div>

              {/* Record fields grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {recordFields.map((field) => (
                  <div key={field.label}>
                    <span className="text-[10px] text-dark-mode-secondary/40">{field.label}</span>
                    <p className={`text-xs font-medium mt-0.5 ${
                      field.highlight ? 'text-success' :
                      field.accent ? 'text-primary' :
                      'text-dark-mode-text'
                    }`}>
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/[0.06] px-3 py-2.5">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[11px] font-medium text-primary">Schedule demo call</span>
              </div>
            </div>
          </div>

          {/* ── Capability 4: Marketing campaign (6 cols) ── */}
          <div className="rounded-2xl border border-border-dark bg-base-900/50 p-7 lg:col-span-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-mode-text">Marketing & subscribers</h3>
                <p className="text-[11px] text-dark-mode-secondary/50">Nurture from the same record</p>
              </div>
            </div>

            <p className="mb-4 text-xs font-medium text-dark-mode-text">Summer Launch 2026</p>

            {/* Campaign timeline */}
            <div className="flex items-center gap-0 overflow-x-auto pb-1">
              {campaignSteps.map((step, i) => (
                <div key={step.name} className="flex items-center">
                  <div className={`flex flex-col items-center gap-1.5 rounded-lg border px-4 py-3 min-w-[90px] ${
                    step.done
                      ? 'border-success/20 bg-success/[0.04]'
                      : 'border-border-dark bg-white/[0.02] opacity-45'
                  }`}>
                    <div className={`h-2 w-2 rounded-full ${
                      step.done ? 'bg-success' : 'bg-white/10'
                    }`} />
                    <span className={`text-[10px] font-medium ${
                      step.done ? 'text-dark-mode-text' : 'text-dark-mode-secondary/40'
                    }`}>
                      {step.name}
                    </span>
                    <span className="text-[9px] text-dark-mode-secondary/30">
                      {step.sent ? 'Sent' : step.done ? 'Ready' : 'Scheduled'}
                    </span>
                  </div>
                  {i < campaignSteps.length - 1 && (
                    <div className={`h-px w-5 ${
                      step.done && campaignSteps[i + 1]?.done ? 'bg-success/30' : 'bg-border-dark'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-border-dark bg-white/[0.02] px-3 py-2.5">
                <span className="text-[9px] text-dark-mode-secondary/40">Enrolled</span>
                <p className="text-sm font-semibold text-dark-mode-text">3</p>
              </div>
              <div className="rounded-lg border border-border-dark bg-white/[0.02] px-3 py-2.5">
                <span className="text-[9px] text-dark-mode-secondary/40">Opened</span>
                <p className="text-sm font-semibold text-dark-mode-text">12</p>
              </div>
              <div className="rounded-lg border border-border-dark bg-white/[0.02] px-3 py-2.5">
                <span className="text-[9px] text-dark-mode-secondary/40">Revenue</span>
                <p className="text-sm font-semibold text-success">$0</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
