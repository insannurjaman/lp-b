import { MessageCircle, Globe, Smartphone, Mail, PhoneCall, Bot, Check, User, ArrowRight, TrendingUp } from 'lucide-react'

const channels = [
  { name: 'TikTok', icon: MessageCircle },
  { name: 'Instagram', icon: MessageCircle },
  { name: 'Facebook', icon: MessageCircle },
  { name: 'WhatsApp', icon: Globe },
  { name: 'SMS', icon: Smartphone },
  { name: 'Email', icon: Mail },
  { name: 'Voice', icon: PhoneCall },
]

const agentSteps = [
  { action: 'Reply to comment', status: 'completed' as const },
  { action: 'Send DM follow-up', status: 'completed' as const },
  { action: 'Answer questions', status: 'completed' as const },
  { action: 'Qualify lead', status: 'active' as const },
  { action: 'Create CRM contact', status: 'pending' as const },
  { action: 'Initiate AI call', status: 'pending' as const },
  { action: 'Add to campaign', status: 'pending' as const },
]

const campaignSteps = [
  { name: 'Welcome', done: true },
  { name: 'Features', done: true },
  { name: 'Case study', done: false },
  { name: 'Demo invite', done: false },
  { name: 'Follow-up', done: false },
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
          {/* Capability 1: Unified inbox - wide horizontal */}
          <div className="rounded-2xl border border-border-dark bg-base-900/50 p-6 lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-mode-text">Unified inbox</h3>
                <p className="text-[11px] text-dark-mode-secondary/50">Every channel in one place</p>
              </div>
            </div>
            {/* Channel bar */}
            <div className="mb-4 flex flex-wrap gap-2">
              {channels.map((ch) => {
                const Icon = ch.icon
                return (
                  <div key={ch.name} className="flex items-center gap-1.5 rounded-lg border border-border-dark bg-white/[0.03] px-3 py-1.5">
                    <Icon className="h-3 w-3 text-dark-mode-secondary/60" aria-hidden="true" />
                    <span className="text-[10px] text-dark-mode-secondary/60">{ch.name}</span>
                  </div>
                )
              })}
            </div>
            {/* Inbox preview */}
            <div className="space-y-1">
              {[
                { channel: 'TikTok', person: 'Alex Chen', preview: 'How much is this?', active: true },
                { channel: 'Instagram', person: 'Sam Rivera', preview: 'Is this available?' },
                { channel: 'WhatsApp', person: 'Jordan Lee', preview: 'Thanks for the info' },
              ].map((item) => (
                <div key={item.person} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                  item.active ? 'bg-primary/5 ring-1 ring-primary/20' : 'opacity-60'
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
                  <span className="text-[9px] text-dark-mode-secondary/30">{item.channel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Capability 2: AI agents - vertical stream */}
          <div className="rounded-2xl border border-border-dark bg-base-900/50 p-6 lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-mode-text">AI agents</h3>
                <p className="text-[11px] text-dark-mode-secondary/50">Autonomous task execution</p>
              </div>
            </div>
            <div className="space-y-1">
              {agentSteps.map((step) => (
                <div key={step.action} className="flex items-center gap-2.5 rounded-lg px-3 py-2">
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    step.status === 'completed' ? 'bg-success/15' :
                    step.status === 'active' ? 'bg-primary/15' : 'bg-white/5'
                  }`}>
                    {step.status === 'completed' ? (
                      <Check className="h-3 w-3 text-success" aria-hidden="true" />
                    ) : step.status === 'active' ? (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    )}
                  </div>
                  <span className={`text-xs ${
                    step.status === 'completed' ? 'text-dark-mode-secondary/70' :
                    step.status === 'active' ? 'font-medium text-dark-mode-text' :
                    'text-dark-mode-secondary/30'
                  }`}>
                    {step.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Capability 3: Built-in CRM - large record */}
          <div className="rounded-2xl border border-border-dark bg-base-900/50 p-6 lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <User className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-mode-text">Built-in CRM</h3>
                <p className="text-[11px] text-dark-mode-secondary/50">Every conversation is a record</p>
              </div>
            </div>
            <div className="rounded-lg border border-border-dark bg-base-950/50 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  AC
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-mode-text">Alex Chen</p>
                  <p className="text-[10px] text-dark-mode-secondary/50">Lead · Created 15m ago</p>
                </div>
                <span className="ml-auto rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                  Score 92
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-dark-mode-secondary/40">Intent</span>
                  <p className="text-xs font-medium text-success">High</p>
                </div>
                <div>
                  <span className="text-[10px] text-dark-mode-secondary/40">Owner</span>
                  <p className="text-xs font-medium text-dark-mode-text">AI Agent</p>
                </div>
                <div>
                  <span className="text-[10px] text-dark-mode-secondary/40">Source</span>
                  <p className="text-xs font-medium text-dark-mode-text">TikTok</p>
                </div>
                <div>
                  <span className="text-[10px] text-dark-mode-secondary/40">Campaign</span>
                  <p className="text-xs font-medium text-primary">Summer 2026</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
                <ArrowRight className="h-3 w-3 text-primary" aria-hidden="true" />
                <span className="text-[10px] font-medium text-primary">Schedule demo call</span>
              </div>
            </div>
          </div>

          {/* Capability 4: Marketing - horizontal timeline */}
          <div className="rounded-2xl border border-border-dark bg-base-900/50 p-6 lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-mode-text">Marketing & subscribers</h3>
                <p className="text-[11px] text-dark-mode-secondary/50">Nurture from the same record</p>
              </div>
            </div>
            <p className="mb-4 text-xs font-medium text-dark-mode-text">Summer Launch 2026 — Campaign progression</p>
            <div className="flex items-center gap-0 overflow-x-auto pb-2">
              {campaignSteps.map((step, i) => (
                <div key={step.name} className="flex items-center">
                  <div className={`flex flex-col items-center gap-1.5 rounded-lg border px-4 py-3 min-w-[100px] ${
                    step.done
                      ? 'border-success/20 bg-success/5'
                      : 'border-border-dark bg-white/[0.02] opacity-50'
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
                      {step.done ? 'Sent' : 'Scheduled'}
                    </span>
                  </div>
                  {i < campaignSteps.length - 1 && (
                    <div className={`h-px w-6 ${
                      step.done && campaignSteps[i + 1]?.done ? 'bg-success/30' : 'bg-border-dark'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-dark-mode-secondary/40">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span>3 subscribers enrolled</span>
              </div>
              <span className="text-dark-mode-secondary/20">·</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>1 open task</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
