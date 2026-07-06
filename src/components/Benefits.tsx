import { motion, useReducedMotion } from 'framer-motion'
import Container from './Container'
import { benefits } from '../data/content'

export default function Benefits() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-page py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                className="flex flex-col gap-3 bg-surface p-6 md:p-7"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-surface">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-secondary">{benefit.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
