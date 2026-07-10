import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Container from './Container'
import { journeySteps, proofBenefits } from '../data/content'

export default function ProductProof() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-surface-2 py-20 md:py-24 lg:py-28">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            One conversation.
            <br />
            Handled from start to finish.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary text-pretty">
            From first comment to customer won, Base360 handles every step without losing context.
          </p>
        </div>

        {/* Journey timeline */}
        <div className="mt-12 md:mt-16">
          {/* Desktop: horizontal 8-step timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-0 right-0 top-7 h-px bg-line" />
              <motion.div
                className="absolute left-0 top-7 h-px bg-primary/50"
                initial={{ width: '0%' }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ duration: reduceMotion ? 0 : 1.4, ease: 'easeInOut' }}
              />

              <div className="relative grid grid-cols-8 gap-2">
                {journeySteps.map((step, i) => {
                  const Icon = step.icon
                  const isCompleted = i < 7
                  return (
                    <motion.div
                      key={step.number}
                      className="flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-card transition-colors ${
                        isCompleted ? 'border-success/30 bg-success/5' : 'border-line bg-surface'
                      }`}>
                        <Icon className={`h-5 w-5 ${isCompleted ? 'text-success' : 'text-primary'}`} />
                      </div>
                      <span className="mt-3 text-[13px] font-semibold uppercase tracking-wider text-ink-muted">{step.number}</span>
                      <p className="mt-1 text-[15px] font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-[13px] leading-snug text-ink-secondary">{step.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile / tablet: vertical timeline */}
          <div className="lg:hidden">
            <div className="relative space-y-5">
              {journeySteps.map((step, i) => {
                const Icon = step.icon
                const isCompleted = i < 7
                return (
                  <motion.div
                    key={step.number}
                    className="relative flex gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${isCompleted ? 'border-success/30 bg-success/5' : 'border-line bg-surface'}`}>
                        <Icon className={`h-4 w-4 ${isCompleted ? 'text-success' : 'text-primary'}`} />
                      </div>
                      {i < journeySteps.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-line" style={{ minHeight: '20px' }} />
                      )}
                    </div>
                    <div className="pt-1.5 pb-2">
                      <span className="text-[13px] font-semibold uppercase tracking-wider text-ink-muted">{step.number}</span>
                      <p className="mt-0.5 text-[16px] font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-secondary">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Benefit summaries */}
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-8 lg:grid-cols-4">
          {proofBenefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              <span className="text-[14px] font-medium text-ink">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
