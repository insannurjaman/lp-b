import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, PhoneCall, Bot, ArrowRight, Mail, CheckCircle2 } from "lucide-react"
import { conversations, customerFields, activityEvents } from '../data/content'

type Tab = 'conversation' | 'customer' | 'activity'

const tabs: { id: Tab; label: string }[] = [
  { id: 'conversation', label: 'Conversation' },
  { id: 'customer', label: 'Customer' },
  { id: 'activity', label: 'Activity' },
]

export default function WorkspaceTabsMobile() {
  const [activeTab, setActiveTab] = useState<Tab>('conversation')
  const tabId = useId()

  return (
    <div className="overflow-hidden rounded-[16px] border border-line bg-surface shadow-lifted">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-line bg-surface-2/50 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <span className="text-[11px] font-bold text-primary">B</span>
          </div>
          <span className="text-[13px] font-medium text-ink-secondary">Base360</span>
        </div>
      </div>

      {/* Sticky segmented control */}
      <div
        role="tablist"
        aria-label="Workspace section"
        className="sticky top-0 z-10 flex border-b border-line bg-surface px-2 py-2"
        id={tabId}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tabId}-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${
              activeTab === tab.id ? 'text-primary' : 'text-ink-secondary'
            }`}
            type="button"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 rounded-lg bg-violet-surface"
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="min-h-[400px]">
        {activeTab === 'conversation' && (
          <div role="tabpanel" id={`${tabId}-conversation`} className="p-4">
            <ConversationPanel />
          </div>
        )}
        {activeTab === 'customer' && (
          <div role="tabpanel" id={`${tabId}-customer`} className="p-4">
            <CustomerPanel />
          </div>
        )}
        {activeTab === 'activity' && (
          <div role="tabpanel" id={`${tabId}-activity`} className="p-4">
            <ActivityPanel />
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-line bg-surface-2/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span className="text-[13px] text-ink-secondary">AI agent online</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PhoneCall className="h-3.5 w-3.5 text-ink-muted" />
          <span className="text-[13px] text-ink-muted">Call scheduled</span>
        </div>
      </div>
    </div>
  )
}

function ConversationPanel() {
  const selected = conversations[0]
  return (
    <div className="space-y-3">
      {/* Selected conversation header */}
      <div className="flex items-center gap-2.5 rounded-lg border border-line bg-surface-2/30 px-3 py-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-surface text-[13px] font-semibold text-primary">AC</div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-ink">{selected.person}</p>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5 text-ink-muted" />
            <span className="text-[13px] text-ink-muted">{selected.channel}</span>
          </div>
        </div>
        <span className="rounded-md bg-violet-surface px-2.5 py-1 text-[12px] font-medium text-primary">High intent</span>
      </div>

      {/* Messages */}
      <div className="max-w-[85%]">
        <div className="rounded-xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5">
          <p className="text-[15px] text-ink">How much is this?</p>
        </div>
        <p className="mt-1 text-[13px] text-ink-muted">Alex - TikTok - 2m ago</p>
      </div>

      <div className="ml-auto max-w-[85%]">
        <div className="rounded-xl rounded-br-sm bg-violet-surface px-3.5 py-2.5">
          <p className="text-[15px] text-ink">Hi Alex! I&apos;ve sent pricing to your DMs. Let me know which plan works for you.</p>
        </div>
        <p className="mt-1 text-right text-[13px] text-ink-muted">Base360 AI - 1m ago</p>
      </div>

      <div className="max-w-[85%]">
        <div className="rounded-xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5">
          <p className="text-[15px] text-ink">The pro plan looks good. Is it available?</p>
        </div>
        <p className="mt-1 text-[13px] text-ink-muted">Alex - Instagram DM - now</p>
      </div>

      {/* AI suggestion */}
      <div className="rounded-lg border border-primary/25 bg-violet-surface/50 p-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <span className="text-[14px] font-semibold text-primary">AI suggestion</span>
          <span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 text-[12px] font-medium text-primary">Score 92</span>
        </div>
        <p className="mt-2.5 text-[14px] leading-relaxed text-ink-secondary">
          Reply with feature comparison. High buying intent detected - recommend scheduling a demo.
        </p>
        <div className="mt-3 flex gap-2">
          <button type="button" className="rounded-md bg-primary px-3.5 py-2 text-[13px] font-medium text-white">Send reply</button>
          <button type="button" className="rounded-md border border-line px-3.5 py-2 text-[13px] font-medium text-ink-secondary">Edit</button>
        </div>
      </div>
    </div>
  )
}

function CustomerPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-surface text-[14px] font-semibold text-primary">AC</div>
        <div>
          <p className="text-[16px] font-semibold text-ink">Alex Chen</p>
          <p className="text-[13px] text-ink-muted">alex.c@example.com</p>
        </div>
        <span className="ml-auto rounded-md bg-violet-surface px-2.5 py-1 text-[12px] font-semibold text-primary">Score 92</span>
      </div>

      <div className="space-y-2.5 border-t border-line pt-4">
        {customerFields.map((field) => (
          <div key={field.label} className="flex items-center justify-between">
            <span className="text-[13px] text-ink-muted">{field.label}</span>
            <span className={`text-[15px] font-medium ${field.accent === 'violet' ? 'text-primary' : field.accent === 'success' ? 'text-success' : 'text-ink'}`}>
              {field.value}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-primary/25 bg-violet-surface/40 p-3.5">
        <p className="mb-1 text-[13px] font-medium text-ink-secondary">Next action</p>
        <div className="flex items-center gap-1.5">
          <ArrowRight className="h-4 w-4 text-primary" />
          <span className="text-[15px] font-medium text-primary">Schedule demo call</span>
        </div>
      </div>
    </div>
  )
}

function ActivityPanel() {
  return (
    <div className="space-y-3">
      {activityEvents.map((evt) => {
        const Icon = evt.icon
        return (
          <div key={evt.id} className="flex items-start gap-2.5">
            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${evt.done ? 'bg-success/10 text-success' : 'bg-surface-2 text-ink-secondary'}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className={`text-[15px] ${evt.done ? 'text-ink' : 'text-ink-secondary'}`}>{evt.action}</p>
              <p className="text-[13px] text-ink-muted">{evt.time}</p>
            </div>
            {evt.done && <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-success" />}
          </div>
        )
      })}

      {/* Upcoming */}
      <div className="mt-4 border-t border-line pt-4">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-ink-muted">Upcoming</p>
        <div className="flex items-start gap-2.5 opacity-70">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-2 text-ink-muted">
            <Mail className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] text-ink-secondary">Nurture campaign message</p>
            <p className="text-[13px] text-ink-muted">Tomorrow - Summer Launch sequence</p>
          </div>
        </div>
      </div>
    </div>
  )
}
