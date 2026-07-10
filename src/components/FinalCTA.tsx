import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Play, CheckCircle2, MessageCircle } from 'lucide-react'
import Container from './Container'
import EarlyAccessForm from './EarlyAccessForm'
import { OrbitCore, OrbitSuccess } from './Orbit'

export default function FinalCTA() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-page py-20 md:py-28 lg:py-36">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] border border-line bg-surface-2">
          {/* Dotted grid texture */}
          <div className="dotted-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-12 p-8 md:p-14 lg:grid-cols-2 lg:gap-16 lg:p-16">

            {/* Left: headline + form */}
            <div className="flex flex-col justify-center">
              <motion.h2
                className="font-heading text-[clamp(34px,4.5vw,56px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Your next customer may have already commented.
              </motion.h2>
              <motion.p
                className="mt-5 text-[18px] leading-relaxed text-ink-secondary text-pretty"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Base360 makes sure the conversation goes somewhere.
              </motion.p>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <EarlyAccessForm />
              </motion.div>

              <div className="mt-5">
                <a
                  href="#how-it-works"
                  onClick={handleNavClick('#how-it-works')}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  <Play className="h-3.5 w-3.5" />
                  Watch the journey
                </a>
              </div>
            </div>

            {/* Right: narrative closure — comment to won transformation */}
            <div className="flex items-center justify-center">
              <motion.div
                className="relative w-full max-w-[400px]"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Condensed transformation: comment -> Base360 -> won */}
                <div className="space-y-3">
                  {/* Original comment */}
                  <div className="rounded-xl border border-line bg-surface p-4 shadow-float">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink">
                        <MessageCircle className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-ink">TikTok comment</p>
                        <span className="text-[12px] text-ink-muted">Alex Chen - just now</span>
                      </div>
                    </div>
                    <p className="text-[15px] font-medium text-ink">&ldquo;How much is this?&rdquo;</p>
                  </div>

                  {/* Signal path with Base360 core */}
                  <div className="flex items-center justify-center gap-3 py-1">
                    <svg viewBox="0 0 120 24" fill="none" className="h-6 w-full" aria-hidden="true">
                      <path d="M 4 12 L 116 12" stroke="#6657FF" strokeWidth="1.5" strokeDasharray="3 4" strokeOpacity="0.4" />
                      <circle cx="4" cy="12" r="3" fill="#6657FF" fillOpacity="0.5" />
                      <circle cx="60" cy="12" r="4" fill="#6657FF" fillOpacity="0.3" />
                      <circle cx="60" cy="12" r="2.5" fill="#6657FF" />
                      <circle cx="116" cy="12" r="3" fill="#42B883" />
                    </svg>
                  </div>
                  <div className="flex justify-center">
                    <OrbitCore size={56} active={!reduceMotion && inView} complete={true} showPulse={false} showSignalDots={false} />
                  </div>

                  {/* Final customer record — won state */}
                  <OrbitSuccess
                    person="Alex Chen"
                    initials="AC"
                    source="TikTok"
                    intent="High"
                    leadStage="Customer"
                    score="92"
                    campaign="Summer 2026"
                  />

                  {/* Outcome grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-line bg-surface p-3.5">
                      <span className="text-[12px] text-ink-muted">Channels</span>
                      <p className="text-[14px] font-medium text-ink">4 connected</p>
                    </div>
                    <div className="rounded-lg border border-line bg-surface p-3.5">
                      <span className="text-[12px] text-ink-muted">Campaign</span>
                      <p className="text-[14px] font-medium text-ink">Completed</p>
                    </div>
                  </div>

                  {/* Won outcome */}
                  <div className="flex items-center gap-2 rounded-lg border border-success/25 bg-success/5 px-4 py-3.5">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-[14px] font-semibold text-success">Outcome: Won</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
