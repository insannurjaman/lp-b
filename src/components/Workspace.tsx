import { MessageCircle, PhoneCall, Mail, Globe, Smartphone, ArrowRight, Bot } from 'lucide-react'

const conversations = [
  { channel: 'TikTok', person: 'Alex Chen', preview: 'How much is this?', time: '2m ago', unread: true, icon: MessageCircle },
  { channel: 'Instagram DM', person: 'Sam Rivera', preview: 'Is this still available?', time: '15m ago', unread: true, icon: MessageCircle },
  { channel: 'WhatsApp', person: 'Jordan Lee', preview: 'Thanks for the info!', time: '1h ago', unread: false, icon: Globe },
  { channel: 'Email', person: 'Priya Sharma', preview: 'Looking forward to the demo', time: '2h ago', unread: false, icon: Mail },
  { channel: 'SMS', person: '+1 (555) 234-5678', preview: 'Can you call me?', time: '3h ago', unread: false, icon: Smartphone },
  { channel: 'Voice', person: 'Morgan Chen', preview: 'Voicemail: call back request', time: '5h ago', unread: false, icon: PhoneCall },
]

const agentActivity = [
  { action: 'Replied to TikTok comment', channel: 'TikTok', done: true },
  { action: 'Sent DM follow-up', channel: 'Instagram', done: true },
  { action: 'Qualified lead — High intent', channel: 'System', done: true },
  { action: 'Created CRM contact', channel: 'System', done: true },
  { action: 'Completed AI voice call', channel: 'Phone', done: false },
  { action: 'Added to nurture campaign', channel: 'System', done: false },
]

export default function Workspace() {
  return (
    <section id="workspace" className="bg-cream py-36 md:py-48">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-[0.96] tracking-tight text-dark-text text-balance">
            Every conversation.
            <br />
            One operating system.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Social comments, DMs, WhatsApp, SMS, email, and calls — all in one workspace with AI agents that act on every message.
          </p>
        </div>

        {/* Large workspace UI */}
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-border bg-base-950 shadow-2xl">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border-dark px-5 py-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-dark-mode-text/70">base360</span>
              <span className="text-[10px] text-dark-mode-secondary/40">|</span>
              <span className="text-[11px] text-dark-mode-secondary/60">Inbox</span>
              <span className="text-[11px] text-dark-mode-secondary/40">Conversations</span>
              <span className="text-[11px] text-dark-mode-secondary/40">Customers</span>
              <span className="text-[11px] text-dark-mode-secondary/40">Campaigns</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[9px] font-medium text-primary">
                AI
              </div>
              <span className="text-[10px] text-dark-mode-secondary/50">Agent active</span>
            </div>
          </div>

          {/* Three-panel layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Left: Inbox */}
            <div className="w-full border-b border-border-dark lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-r">
              <div className="border-b border-border-dark px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-dark-mode-secondary/40">
                  Inbox · {conversations.length}
                </p>
              </div>
              <div className="divide-y divide-border-dark">
                {conversations.map((conv) => {
                  const Icon = conv.icon
                  return (
                    <div
                      key={conv.person}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] ${
                        conv.unread ? '' : 'opacity-60'
                      }`}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        conv.unread ? 'bg-primary/15 text-primary' : 'bg-white/5 text-dark-mode-secondary/40'
                      }`}>
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`truncate text-xs ${
                            conv.unread ? 'font-medium text-dark-mode-text' : 'text-dark-mode-secondary/60'
                          }`}>
                            {conv.person}
                          </p>
                          {conv.unread && <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                        </div>
                        <p className="truncate text-[10px] text-dark-mode-secondary/40">{conv.preview}</p>
                      </div>
                      <span className="shrink-0 text-[9px] text-dark-mode-secondary/30">{conv.time}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Center: Active conversation */}
            <div className="flex-1 border-b border-border-dark lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3 border-b border-border-dark px-5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  AC
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-mode-text">Alex Chen</p>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-3 w-3 text-dark-mode-secondary/40" aria-hidden="true" />
                    <span className="text-[10px] text-dark-mode-secondary/50">TikTok → Instagram DM</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                    High intent
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-5 min-h-[280px]">
                <div className="max-w-[85%]">
                  <div className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                    <p className="text-xs text-dark-mode-text">How much is this?</p>
                  </div>
                  <p className="mt-1 text-[10px] text-dark-mode-secondary/30">Alex · TikTok · 2m ago</p>
                </div>
                <div className="ml-auto max-w-[85%]">
                  <div className="rounded-2xl rounded-br-sm bg-primary/15 px-4 py-3">
                    <p className="text-xs text-dark-mode-text">Hi Alex! I&apos;ve sent the pricing details to your DMs. Let me know which option looks best.</p>
                  </div>
                  <p className="mt-1 text-right text-[10px] text-dark-mode-secondary/30">Base360 AI · 1m ago</p>
                </div>
                <div className="max-w-[85%]">
                  <div className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                    <p className="text-xs text-dark-mode-text">The pro plan looks good. Is it available?</p>
                  </div>
                  <p className="mt-1 text-[10px] text-dark-mode-secondary/30">Alex · Instagram DM · now</p>
                </div>

                {/* AI suggestion */}
                <div className="rounded-lg border border-border-dark bg-white/[0.02] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span className="text-[11px] font-medium text-primary">AI suggestion</span>
                  </div>
                  <p className="mt-1 text-[11px] text-dark-mode-secondary/60">
                    Reply with feature comparison and check availability. Lead score: 92 — high buying intent detected.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button type="button" className="rounded-md bg-primary px-3 py-1.5 text-[10px] font-medium text-white cursor-pointer">
                      Send reply
                    </button>
                    <button type="button" className="rounded-md border border-border-dark px-3 py-1.5 text-[10px] font-medium text-dark-mode-secondary cursor-pointer">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Customer intelligence */}
            <div className="w-full lg:w-[280px] lg:shrink-0">
              <div className="border-b border-border-dark px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-dark-mode-secondary/40">Intelligence</p>
              </div>
              <div className="p-4 space-y-4">
                {/* Customer summary */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                    AC
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-mode-text">Alex Chen</p>
                    <p className="text-[10px] text-dark-mode-secondary/50">alex.c@example.com</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: 'Lead status', value: 'Qualified', accent: true },
                    { label: 'Intent', value: 'High', accent: true },
                    { label: 'Owner', value: 'AI Agent' },
                    { label: 'Channel', value: 'TikTok → Instagram' },
                    { label: 'Campaign', value: 'Summer Launch 2026' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-border-dark pb-2">
                      <span className="text-[10px] text-dark-mode-secondary/40">{item.label}</span>
                      <span className={`text-[10px] font-medium ${
                        item.accent ? 'text-primary' : 'text-dark-mode-text'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-border-dark bg-white/[0.02] p-3">
                  <p className="mb-2 text-[10px] font-semibold text-dark-mode-secondary/40">Next action</p>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-primary" aria-hidden="true" />
                    <span className="text-xs font-medium text-primary">Schedule demo call</span>
                  </div>
                </div>
              </div>

              {/* AI activity */}
              <div className="border-t border-border-dark px-4 py-3">
                <p className="mb-2 text-[10px] font-semibold text-dark-mode-secondary/40">AI activity</p>
                <div className="space-y-1.5">
                  {agentActivity.map((act) => (
                    <div key={act.action} className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        act.done ? 'bg-success' : 'bg-white/10'
                      }`} />
                      <span className={`text-[10px] ${
                        act.done ? 'text-dark-mode-secondary/60' : 'text-dark-mode-secondary/30'
                      }`}>
                        {act.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom AI status */}
          <div className="flex items-center gap-3 border-t border-border-dark px-5 py-2.5">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span className="text-[10px] text-dark-mode-secondary/50">AI agent online · 6 active conversations</span>
          </div>
        </div>
      </div>
    </section>
  )
}
