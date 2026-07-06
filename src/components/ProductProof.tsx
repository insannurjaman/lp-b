import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Container from './Container'
import { journeySteps, proofBenefits } from '../data/content'

export default function ProductProof() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="how-it-works" className="bg-surface-2 py-20 md:py-28 lg:py-32">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            One conversation.
            <br />
            Handled from start to finish.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary text-pretty">
            See how Base360 captures a question, responds, qualifies the customer, creates a lead, and continues follow-up without losing context.
          </p>
        </div>

        {/* Journey timeline */}
        <div className="mt-14 md:mt-20">
          {/* Desktop: horizontal 8-step timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-0 right-0 top-7 h-px bg-line" />
              <motion.div
                className="absolute left-0 top-7 h-px bg-primary/50"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduceMotion ? 0 : 1.6, ease: 'easeInOut' }}
              />

              <div className="relative grid grid-cols-8 gap-2">
                {journeySteps.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={step.number}
                      className="flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Node */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface shadow-card">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{step.number}</span>
                      <p className="mt-1 text-[13px] font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-secondary">{step.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile / tablet: vertical timeline */}
          <div className="lg:hidden">
            <div className="relative space-y-6">
              {journeySteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    className="relative flex gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
                  >
                    {/* Node + vertical line */}
                    <div className="relative flex flex-col items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface shadow-card">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      {i < journeySteps.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-line" style={{ minHeight: '24px' }} />
                      )}
                    </div>
                    {/* Text */}
                    <div className="pt-1.5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{step.number}</span>
                      </div>
                      <p className="mt-0.5 text-[15px] font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-secondary">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Benefit summaries */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-10 lg:grid-cols-4">
          {proofBenefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.08 }}
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
