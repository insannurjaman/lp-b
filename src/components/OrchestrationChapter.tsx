import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Container from './Container'
import { OrbitCore, ChannelInput, ActionNode, OutcomeState } from './Orbit'
import { orchestrationChannels, orchestrationActions, orchestrationOutcomes } from '../data/content'

export default function OrchestrationChapter() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      id="orchestration"
      className="relative overflow-hidden bg-chapter py-20 md:py-28 lg:py-36"
      style={{ color: 'var(--color-chapter-text)' }}
    >
      {/* Dimensional grid + violet illumination */}
      <div className="chapter-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Soft violet glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(102,87,255,0.12), transparent 70%)' }}
        aria-hidden="true"
      />

      <Container>
        {/* Heading */}
        <div className="relative mx-auto max-w-[760px] text-center">
          <motion.h2
            className="font-heading text-[clamp(34px,4.5vw,56px)] font-medium leading-[1.05] tracking-[-0.02em] text-balance"
            style={{ color: 'var(--color-chapter-text)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Every channel in.
            <br />
            Every next action out.
          </motion.h2>
          <motion.p
            className="mt-5 text-[18px] leading-relaxed text-pretty"
            style={{ color: 'var(--color-chapter-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Base360 understands the conversation, chooses the right action, and keeps the customer moving without losing context.
          </motion.p>
        </div>

        {/* Desktop: three-column orchestration */}
        <div className="relative mt-16 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-8"
          >
            {/* Left: Incoming channels */}
            <div className="space-y-2.5">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-chapter-secondary)' }}>
                Incoming channels
              </p>
              {orchestrationChannels.map((ch, i) => (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ChannelInput icon={ch.icon} label={ch.label} active={i < 4} variant="dark" />
                </motion.div>
              ))}
            </div>

            {/* Center: Base360 Orbit Core */}
            <OrchestrationCore inView={inView} reduceMotion={reduceMotion} />

            {/* Right: Outcomes */}
            <div className="space-y-2.5">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-chapter-secondary)' }}>
                Completed outcomes
              </p>
              {orchestrationOutcomes.map((outcome, i) => (
                <motion.div
                  key={outcome.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <OutcomeState label={outcome.label} done={i < 5} variant="dark" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile / tablet: vertical sequence */}
        <div className="relative mt-12 lg:hidden">
          <MobileOrchestration inView={inView} reduceMotion={reduceMotion} />
        </div>
      </Container>
    </section>
  )
}

/* ───────────────── Desktop Core ───────────────── */
function OrchestrationCore({ inView, reduceMotion }: { inView: boolean; reduceMotion: boolean | null }) {
  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      {/* Horizontal connection path */}
      <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 xl:block">
        <div className="relative">
          <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <motion.div
            className="absolute top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #6657FF, transparent)' }}
            initial={{ left: '-50%', width: '50%' }}
            animate={inView && !reduceMotion ? { left: '100%' } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <OrbitCore
        size={128}
        active={inView && !reduceMotion}
        complete={false}
        label="Base360 Core"
        showPulse={inView && !reduceMotion}
      />

      {/* Actions around the orbit — 2x4 grid below core */}
      <div className="mt-6 grid w-full max-w-[420px] grid-cols-2 gap-2">
        {orchestrationActions.map((action, i) => {
          const isDone = i < 6
          const isActive = i === 6
          const status = isDone ? 'done' : isActive ? 'active' : 'pending'
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <ActionNode icon={action.icon} label={action.label} status={status} variant="dark" compact />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ───────────────── Mobile Orchestration ───────────────── */
function MobileOrchestration({ inView, reduceMotion }: { inView: boolean; reduceMotion: boolean | null }) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Channel inputs */}
      <div className="w-full max-w-[360px] space-y-2">
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-chapter-secondary)' }}>
          Incoming channels
        </p>
        {orchestrationChannels.slice(0, 4).map((ch, i) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: reduceMotion ? 0 : i * 0.08 }}
          >
            <ChannelInput icon={ch.icon} label={ch.label} active variant="dark" />
          </motion.div>
        ))}
      </div>

      {/* Core */}
      <OrbitCore
        size={96}
        active={inView && !reduceMotion}
        complete={false}
        label="Base360 Core"
        showPulse={inView && !reduceMotion}
      />

      {/* Actions */}
      <div className="grid w-full max-w-[360px] grid-cols-2 gap-2">
        {orchestrationActions.slice(0, 6).map((action, i) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: reduceMotion ? 0 : i * 0.06 }}
          >
            <ActionNode icon={action.icon} label={action.label} status={i < 4 ? 'done' : 'active'} variant="dark" compact />
          </motion.div>
        ))}
      </div>

      {/* Outcomes */}
      <div className="w-full max-w-[360px] space-y-2">
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-chapter-secondary)' }}>
          Completed outcomes
        </p>
        {orchestrationOutcomes.slice(0, 4).map((outcome, i) => (
          <motion.div
            key={outcome.id}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: reduceMotion ? 0 : i * 0.06 }}
          >
            <OutcomeState label={outcome.label} done={i < 3} variant="dark" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
