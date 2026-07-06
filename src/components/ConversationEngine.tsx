import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, PhoneCall, Check, Loader, Smartphone } from 'lucide-react'
import ConversationSignal from './ConversationSignal'

const stages = [
  { id: 'comment', label: 'Comment captured', detail: 'Inbound TikTok comment', personAction: 'Customer commented', systemAction: 'Captured in inbox', via: 'TikTok', time: 'Just now' },
  { id: 'reply', label: 'Public reply sent', detail: 'AI replied in-thread, moved to DM', personAction: 'Asked about pricing', systemAction: 'Reply generated and sent', via: 'TikTok', time: '1m ago' },
  { id: 'dm', label: 'Private conversation', detail: 'AI continued in Instagram DM', personAction: 'Engaged in DM', systemAction: 'DM thread opened', via: 'Instagram', time: '2m ago' },
  { id: 'qualify', label: 'Intent confirmed', detail: 'High buying intent detected', personAction: 'Shared requirements', systemAction: 'Lead scored: 92', via: 'System', time: '3m ago' },
  { id: 'lead', label: 'CRM record created', detail: 'Contact with full conversation context', personAction: 'Asked for demo', systemAction: 'CRM entry added', via: 'System', time: '3m ago' },
  { id: 'call', label: 'AI call completed', detail: 'Follow-up call — demo scheduled', personAction: 'Accepted call', systemAction: 'Call completed, summary logged', via: 'Phone', time: '8m ago' },
  { id: 'campaign', label: 'Campaign started', detail: 'Added to Summer Launch 2026 nurture', personAction: 'Opted into updates', systemAction: 'Campaign enrollment activated', via: 'System', time: '10m ago' },
  { id: 'won', label: 'Customer won', detail: 'Opportunity closed — revenue booked', personAction: 'Signed', systemAction: 'Deal closed', via: 'System', time: '15m ago' },
]

const signalPath = [
  { x: 40, y: 80 },
  { x: 40, y: 180 },
  { x: 380, y: 180 },
  { x: 380, y: 80 },
  { x: 380, y: 180 },
  { x: 380, y: 300 },
  { x: 700, y: 300 },
  { x: 700, y: 80 },
  { x: 700, y: 180 },
  { x: 700, y: 320 },
]

const channelIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  TikTok: MessageCircle,
  Instagram: MessageCircle,
  System: Smartphone,
  Phone: PhoneCall,
}

export default function ConversationEngine() {
  const [activeStage, setActiveStage] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [completed, setCompleted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const play = useCallback(() => {
    if (playing) return
    setPlaying(true)
    setCompleted(false)
    setActiveStage(0)
  }, [playing])

  const cancelPlayback = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
  }, [])

  useEffect(() => {
    if (!playing) return
    if (activeStage >= stages.length - 1) {
      setPlaying(false)
      setCompleted(true)
      return
    }
    timerRef.current = setTimeout(() => setActiveStage((prev) => prev + 1), 1800)
    return () => cancelPlayback()
  }, [playing, activeStage, cancelPlayback])

  const reset = useCallback(() => {
    cancelPlayback()
    setActiveStage(0)
    setPlaying(false)
    setCompleted(false)
  }, [cancelPlayback])

  const progress = stages.length > 1 ? activeStage / (stages.length - 1) : 0
  const current = stages[activeStage]

  return (
    <div
      className="relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl border border-border-dark bg-base-950 shadow-2xl"
      role="region"
      aria-label="Base360 conversation engine demonstration"
    >
      <ConversationSignal points={signalPath} progress={progress} />

      <div className="flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border-dark px-5 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-dark-mode-text">base360</span>
            <span className="text-xs text-dark-mode-secondary/40">|</span>
            <span className="text-xs text-dark-mode-secondary/60">Inbox</span>
            <span className="hidden text-xs text-dark-mode-secondary/50 sm:inline">
              {playing || completed ? `Step ${Math.min(activeStage + 1, stages.length)} of ${stages.length}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {completed && (
              <span className="rounded-md bg-success/15 px-3 py-1 text-xs font-medium text-success">
                Customer won
              </span>
            )}
            {!playing && !completed && (
              <button
                type="button"
                onClick={play}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-medium text-white transition-all hover:bg-primary/90 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                Run the journey
              </button>
            )}
            {playing && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-md border border-border-dark px-4 py-2 text-xs font-medium text-dark-mode-secondary transition-all hover:text-dark-mode-text cursor-pointer"
              >
                <Loader className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                {activeStage + 1}/{stages.length}
              </button>
            )}
            {completed && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-md border border-border-dark px-4 py-2 text-xs font-medium text-dark-mode-secondary transition-all hover:text-dark-mode-text cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                Replay
              </button>
            )}
          </div>
        </div>

        {/* Three panels */}
        <div className="flex">
          {/* Left: Inbox */}
          <div className="hidden w-[220px] shrink-0 border-r border-border-dark p-3 md:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-mode-secondary/50">Conversations</p>
            <div className="space-y-1">
              {stages.map((s, i) => {
                const Icon = channelIcons[s.via] || MessageCircle
                const isActive = i === activeStage
                const isPast = i < activeStage
                return (
                  <div
                    key={s.id}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-all duration-300 ${
                      isActive ? 'bg-primary/12 ring-1 ring-primary/30' : isPast ? 'bg-white/[0.03]' : 'opacity-55'
                    }`}
                  >
                    <div className={`flex h-7 w-7 items-center justify-center rounded-md ${
                      isActive ? 'bg-primary/20 text-primary' : isPast ? 'bg-white/8 text-dark-mode-secondary/60' : 'bg-white/5 text-dark-mode-secondary/40'
                    }`}>
                      {isPast || (isActive && s.id === 'won') ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Icon className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-xs font-medium ${isActive || isPast ? 'text-dark-mode-text' : 'text-dark-mode-secondary/50'}`}>
                        {s.via}
                      </p>
                      <p className={`truncate text-[10px] ${isActive || isPast ? 'text-dark-mode-secondary/50' : 'text-dark-mode-secondary/30'}`}>
                        {s.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Center: Conversation */}
          <div className="flex-1 border-r border-border-dark">
            <div className="flex items-center gap-3 border-b border-border-dark px-5 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                AC
              </div>
              <div>
                <p className="text-sm font-medium text-dark-mode-text">Alex Chen</p>
                <p className="text-xs text-dark-mode-secondary/60">{current.via} · {current.time}</p>
              </div>
              <div className="ml-auto">
                <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  activeStage >= 6 ? 'bg-success/15 text-success' :
                  activeStage >= 4 ? 'bg-primary/15 text-primary' :
                  'bg-white/8 text-dark-mode-secondary/60'
                }`}>
                  {activeStage >= 7 ? 'Customer' :
                   activeStage >= 5 ? 'Active Deal' :
                   activeStage >= 4 ? 'Lead' :
                   activeStage >= 1 ? 'Active' : 'New'}
                </span>
              </div>
            </div>

            <div className="space-y-3 p-5 min-h-[280px]">
              {/* Original comment — always visible */}
              <div className={`mb-3 max-w-[80%] transition-all duration-300 ${activeStage === 0 ? '' : 'opacity-50'}`}>
                <div className="rounded-2xl rounded-bl-sm bg-white/12 px-4 py-3">
                  <p className="text-sm text-dark-mode-text">How much is this?</p>
                </div>
                <p className="mt-1 text-xs text-dark-mode-secondary/40">Alex Chen via TikTok · Just now</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* AI reply */}
                  {activeStage >= 1 && (
                    <div className="mb-3 ml-auto max-w-[80%]">
                      <div className="rounded-2xl rounded-br-sm bg-primary/15 px-4 py-3">
                        <p className="text-sm text-dark-mode-text">
                          {activeStage === 1 ? "I've sent the details to your DMs." :
                           activeStage === 2 ? 'Happy to help. Which option are you interested in?' :
                           activeStage === 3 ? 'Great choice. Let me check availability and pricing for you.' :
                           'Perfect. I\'ve set up a demo call for tomorrow.'}
                        </p>
                      </div>
                      <p className="mt-1 text-right text-xs text-dark-mode-secondary/40">Base360 AI · {current.time}</p>
                    </div>
                  )}

                  {/* Customer response */}
                  {activeStage >= 3 && (
                    <div className="mb-3 max-w-[80%]">
                      <div className="rounded-2xl rounded-bl-sm bg-white/12 px-4 py-3">
                        <p className="text-sm text-dark-mode-text">
                          {activeStage === 3 ? "I'm interested in the pro plan." :
                           "Yes, tomorrow works. Thanks!"}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-dark-mode-secondary/40">Alex Chen · {activeStage === 3 ? '3m ago' : '8m ago'}</p>
                    </div>
                  )}

                  {/* Stage detail card */}
                  <div className={`mt-4 rounded-lg border px-4 py-3.5 ${
                    activeStage >= stages.length - 1 ? 'border-success/20 bg-success/5' : 'border-border-dark bg-white/[0.03]'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${
                        activeStage >= stages.length - 1 ? 'bg-success' : 'bg-primary'
                      }`} />
                      <span className="text-sm font-medium text-dark-mode-text">{current.label}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-dark-mode-secondary/60">
                      <span>Customer: {current.personAction}</span>
                      <span>System: {current.systemAction}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Customer profile */}
          <div className="hidden w-[240px] shrink-0 p-3 lg:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-mode-secondary/50">Customer</p>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                AC
              </div>
              <div>
                <p className="text-sm font-medium text-dark-mode-text">Alex Chen</p>
                <p className="text-xs text-dark-mode-secondary/60">alex.c@example.com</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border-dark pb-2">
                <span className="text-xs text-dark-mode-secondary/50">Status</span>
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${
                  activeStage >= 7 ? 'bg-success/15 text-success' :
                  activeStage >= 4 ? 'bg-primary/15 text-primary' :
                  'bg-white/8 text-dark-mode-secondary/60'
                }`}>
                  {activeStage >= 7 ? 'Won' :
                   activeStage >= 4 ? 'Qualified' :
                   activeStage >= 1 ? 'New' : 'Incoming'}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border-dark pb-2">
                <span className="text-xs text-dark-mode-secondary/50">Intent</span>
                <span className={`text-xs font-medium ${activeStage >= 3 ? 'text-success' : 'text-dark-mode-secondary/60'}`}>
                  {activeStage >= 3 ? 'High' : 'Unknown'}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border-dark pb-2">
                <span className="text-xs text-dark-mode-secondary/50">Owner</span>
                <span className="text-xs font-medium text-dark-mode-text">AI Agent</span>
              </div>
              <div className="flex items-center justify-between border-b border-border-dark pb-2">
                <span className="text-xs text-dark-mode-secondary/50">Next step</span>
                <span className={`text-xs font-medium ${activeStage >= 5 ? 'text-primary' : 'text-dark-mode-secondary/60'}`}>
                  {activeStage >= 7 ? '—' :
                   activeStage >= 5 ? 'Demo call' :
                   activeStage >= 4 ? 'Follow-up' : 'Qualify'}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs text-dark-mode-secondary/50">Campaign</span>
                <span className={`text-xs ${activeStage >= 6 ? 'text-primary font-medium' : 'text-dark-mode-secondary/40'}`}>
                  {activeStage >= 6 ? 'Summer 2026' : '—'}
                </span>
              </div>
            </div>

            {/* AI Activity */}
            <div className="mt-5 rounded-lg border border-border-dark bg-white/[0.03] p-3.5">
              <p className="mb-2.5 text-xs font-semibold text-dark-mode-secondary/50">AI Activity</p>
              <div className="space-y-2">
                {[
                  { label: 'Reply sent', done: activeStage >= 1 },
                  { label: 'DM opened', done: activeStage >= 2 },
                  { label: 'Lead qualified', done: activeStage >= 3 },
                  { label: 'CRM record', done: activeStage >= 4 },
                  { label: 'Call completed', done: activeStage >= 5 },
                  { label: 'Campaign added', done: activeStage >= 6 },
                  { label: 'Customer won', done: activeStage >= 7 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <div className={`h-2 w-2 rounded-full ${item.done ? 'bg-success' : 'bg-white/12'}`} />
                    <span className={`text-xs ${item.done ? 'text-dark-mode-secondary/70' : 'text-dark-mode-secondary/35'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-dark px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-dark-mode-secondary/50">
              {activeStage === 0 ? 'Ready — press "Run the journey" to see the conversation flow through Base360.' :
               playing ? `Step ${activeStage + 1} of ${stages.length}: ${current.label}` :
               completed ? 'Journey complete — every conversation becomes forward motion.' :
               'Ready'}
            </span>
            <span className="text-xs font-medium text-dark-mode-secondary/60">{activeStage + 1}/{stages.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
