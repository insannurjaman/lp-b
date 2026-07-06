import { Check, Clock, MessageCircle, PhoneCall, Mail, Zap } from 'lucide-react'
import Container from './Container'
import EmailCaptureForm from './EmailCaptureForm'

const journeyStages = [
  { name: 'Comment', icon: MessageCircle },
  { name: 'Reply', icon: MessageCircle },
  { name: 'DM', icon: MessageCircle },
  { name: 'Qualify', icon: Zap },
  { name: 'CRM', icon: Check },
  { name: 'Call', icon: PhoneCall },
  { name: 'Campaign', icon: Mail },
  { name: 'Customer', icon: Check, done: true },
]

export default function Closing() {
  return (
    <section id="closing" className="relative bg-cream py-36 md:py-48">
      <Container>
        <div className="relative">
          {/* Editorial headline */}
          <div className="mx-auto max-w-[800px]">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              One system. Every conversation.
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.94] tracking-tight text-dark-text text-balance">
              The next customer is already talking.
            </h2>
            <p className="mt-5 max-w-[540px] text-lg leading-relaxed text-muted">
              Base360 makes sure the conversation goes somewhere. Every comment, message, and call — turned into forward motion.
            </p>
          </div>

          {/* Two-column: record + CTA */}
          <div className="mt-14 grid gap-8 lg:grid-cols-5">
            {/* Completed customer record (3 cols) */}
            <div className="rounded-2xl border border-border bg-base-950 p-6 lg:col-span-3">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
                  <Check className="h-5 w-5 text-success" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-mode-text">Journey complete</p>
                  <p className="text-[10px] text-dark-mode-secondary/50">Comment to customer · 12 minutes</p>
                </div>
                <span className="ml-auto rounded-md bg-success/15 px-2.5 py-1 text-[10px] font-medium text-success">
                  Won
                </span>
              </div>

              {/* Customer profile */}
              <div className="mb-5 flex items-center gap-4 rounded-lg border border-border-dark bg-base-900/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-base font-semibold text-primary">
                  AC
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark-mode-text">Alex Chen</p>
                  <p className="text-[10px] text-dark-mode-secondary/60">alex.c@example.com</p>
                </div>
                <div className="flex items-center gap-1.5 text-dark-mode-secondary/50">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  <span className="text-[10px]">12m to close</span>
                </div>
              </div>

              {/* Key metrics */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                {[
                  { label: 'Channels used', value: '3', sub: 'TikTok, DM, Phone' },
                  { label: 'Interactions', value: '7', sub: '3 inbound · 4 outbound' },
                  { label: 'Revenue', value: '$240', sub: 'Pro plan · Monthly' },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-border-dark bg-base-900/30 px-3 py-2.5">
                    <span className="text-[9px] text-dark-mode-secondary/40">{m.label}</span>
                    <p className="text-lg font-semibold text-dark-mode-text">{m.value}</p>
                    <span className="text-[9px] text-dark-mode-secondary/50">{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* Journey stages as pipeline */}
              <div className="flex items-center justify-between">
                {journeyStages.map((stage, i) => {
                  const Icon = stage.icon
                  const isLast = i === journeyStages.length - 1
                  return (
                    <div key={stage.name} className="flex items-center gap-0">
                      <div className={`flex flex-col items-center gap-1.5 ${
                        isLast ? 'opacity-100' : 'opacity-60'
                      }`}>
                        <div className={`flex h-7 w-7 items-center justify-center rounded-full ${
                          stage.done
                            ? 'bg-success/20 text-success'
                            : 'bg-white/[0.06] text-dark-mode-secondary/40'
                        }`}>
                          <Icon className="h-3 w-3" aria-hidden="true" />
                        </div>
                        <span className={`text-[8px] font-medium ${
                          stage.done ? 'text-success' : 'text-dark-mode-secondary/40'
                        }`}>
                          {stage.name}
                        </span>
                      </div>
                      {!isLast && (
                        <div className="mx-1 h-px w-3 bg-border-dark" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA + proof (2 cols) */}
            <div className="flex flex-col justify-center lg:col-span-2">
              <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
                <p className="text-sm font-medium text-dark-text">Ready to turn conversations into customers?</p>
                <p className="mt-1.5 text-xs text-muted">Request early access to Base360.</p>
                <div className="mt-5">
                  <EmailCaptureForm />
                </div>
                <div className="mt-4 flex items-center gap-4 text-[10px] text-muted/60">
                  <span>No spam · Unsubscribe anytime</span>
                  <span className="text-muted/20">|</span>
                  <span>Early access is free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
