import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Container from './Container'
import { OrbitCore, OrbitPath, OrbitPulse } from './Orbit'
import { customerHistoryEvents } from '../data/content'

export default function CustomerHistory() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="customer-history" className="bg-surface py-20 md:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">

          {/* Left: heading + customer profile */}
          <div>
            <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-balance">
              One customer.
              <br />
              Every interaction preserved.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary text-pretty">
              Comments, messages, calls, lead updates, and campaigns remain connected to one customer history.
            </p>

            {/* Customer profile card */}
            <div className="mt-8 rounded-[16px] border border-line bg-surface-2/40 p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-surface">
                  <span className="text-[15px] font-semibold text-primary">AC</span>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-ink">Alex Chen</p>
                  <p className="text-[13px] text-ink-muted">Customer · Won · Summer Launch 2026</p>
                </div>
                <span className="ml-auto rounded-md bg-success/10 px-2.5 py-1 text-[12px] font-medium text-success">Won</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4">
                <div>
                  <span className="text-[12px] text-ink-muted">Intent</span>
                  <p className="text-[14px] font-semibold text-success">High</p>
                </div>
                <div>
                  <span className="text-[12px] text-ink-muted">Score</span>
                  <p className="text-[14px] font-semibold text-primary">92</p>
                </div>
                <div>
                  <span className="text-[12px] text-ink-muted">Channels</span>
                  <p className="text-[14px] font-semibold text-ink">4</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: connected timeline */}
          <div className="relative">
            {/* Orbit signal indicator */}
            <div className="absolute -left-2 top-0 hidden lg:block">
              <OrbitCore size={48} active={false} complete={true} showPulse={false} />
            </div>

            {/* Timeline */}
            <div className="relative space-y-1 lg:pl-12">
              {/* Vertical orbit path */}
              <div className="absolute left-2 top-2 bottom-2 w-px lg:left-[82px]">
                <OrbitPath variant="vertical" active={false} complete={true} className="h-full" />
              </div>

              {customerHistoryEvents.map((evt, i) => {
                const Icon = evt.icon
                const isWon = evt.id === 'h8'
                return (
                  <motion.div
                    key={evt.id}
                    className="relative flex gap-4 pb-4"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Node */}
                    <div className="relative z-10 shrink-0">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                        isWon ? 'border-success bg-success text-white' :
                        'border-success/30 bg-surface text-success'
                      }`}>
                        {isWon ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 rounded-lg border px-4 py-3 transition-colors ${
                      isWon ? 'border-success/20 bg-success/5' : 'border-line bg-surface'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-muted">{evt.channel}</span>
                        <span className="text-[12px] text-ink-muted">· {evt.time}</span>
                      </div>
                      <p className="mt-0.5 text-[14px] font-semibold text-ink">{evt.action}</p>
                      <p className="mt-0.5 text-[13px] text-ink-secondary">{evt.detail}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Orbit pulse on the path (decorative, animated once) */}
            <div className="absolute left-2 top-2 hidden h-full w-px lg:left-[82px] lg:block">
              <OrbitPulse active={!reduceMotion} variant="vertical" duration={3} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
