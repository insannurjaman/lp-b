import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { CheckCircle2, RotateCcw, MessageCircle } from 'lucide-react'
import Container from './Container'
import Base360PlatformMark from './Base360PlatformMark'
import { heroWorkflowNodes } from '../data/content'

const PHASE_COUNT = 8
const PHASE_MS = 850

export default function HeroJourneyIllustration() {
  const [step, setStep] = useState(0)
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    if (reduceMotion) {
      setStep(PHASE_COUNT)
      return
    }
    if (!inView) return

    setStep(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 1; i <= PHASE_COUNT; i++) {
      timers.push(setTimeout(() => setStep(i), i * PHASE_MS))
    }
    return () => timers.forEach(clearTimeout)
  }, [inView, reduceMotion, playKey])

  const replay = () => {
    if (reduceMotion) return
    setStep(0)
    setPlayKey((k) => k + 1)
  }

  const visible = (threshold: number) => step >= threshold
  const allDone = step >= PHASE_COUNT

  return (
    <div ref={sectionRef} className="relative mt-16 md:mt-24">
      <Container>
        <div
          className="relative rounded-[20px] border border-line bg-gradient-to-b from-surface to-surface-2/50 p-6 shadow-lifted md:p-10 lg:p-12"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Dotted grid texture */}
          <div className="dotted-grid pointer-events-none absolute inset-0 rounded-[20px] opacity-50" aria-hidden="true" />

          {/* Replay control */}
          <button
            onClick={replay}
            className="absolute right-4 top-4 z-20 flex h-9 items-center gap-1.5 rounded-lg border border-line bg-surface/90 px-3 text-[12px] font-medium text-ink-secondary shadow-card backdrop-blur-sm transition-colors hover:text-ink hover:border-line-strong md:right-6 md:top-6"
            aria-label="Replay journey animation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Replay
          </button>

          {/* Desktop: 3-column flow / Mobile: vertical stack */}
          <div className="relative flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-0">

            {/* ── Left: TikTok comment ── */}
            <motion.div
              className="relative z-10 flex flex-1 justify-center lg:justify-start"
              initial={false}
              animate={{
                opacity: visible(1) ? 1 : 0,
                y: visible(1) ? 0 : 16,
                scale: visible(1) ? 1 : 0.96,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-[240px] rounded-xl border border-line bg-surface p-4 shadow-float">
                <div className="mb-2.5 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-ink">
                    <MessageCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-[12px] font-medium text-ink-secondary">TikTok</span>
                  <span className="ml-auto text-[10px] text-ink-muted">just now</span>
                </div>
                <p className="text-[14px] font-medium leading-snug text-ink">&ldquo;How much is this?&rdquo;</p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    animate={visible(1) && !allDone ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                    transition={{ duration: 1.2, repeat: visible(1) && !allDone ? Infinity : 0 }}
                  />
                  <span className="text-[10px] font-medium text-primary">New comment</span>
                </div>
              </div>
            </motion.div>

            {/* Connector 1 (desktop horizontal) */}
            <Connector active={visible(2)} variant="horizontal" className="hidden lg:flex" />

            {/* ── Center: Base360 core + workflow nodes ── */}
            <div className="flex flex-[1.4] flex-col items-center gap-6">
              {/* Core */}
              <motion.div
                className="relative z-10 flex flex-col items-center"
                initial={false}
                animate={{
                  opacity: visible(2) ? 1 : 0,
                  scale: visible(2) ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative">
                  {/* Pulsing ring */}
                  {visible(2) && !allDone && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: '0 0 0 0 rgba(102, 87, 255, 0.3)' }}
                      animate={{ boxShadow: ['0 0 0 0px rgba(102,87,255,0.25)', '0 0 0 16px rgba(102,87,255,0)'] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                      visible(2)
                        ? allDone
                          ? 'border-success/30 bg-success/5'
                          : 'border-primary/30 bg-violet-surface'
                        : 'border-line bg-surface-2'
                    }`}
                  >
                    <Base360PlatformMark size={36} />
                  </div>
                </div>
                <p className={`mt-2.5 text-[12px] font-medium transition-colors duration-500 ${
                  allDone ? 'text-success' : visible(2) ? 'text-primary' : 'text-ink-muted'
                }`}>
                  {allDone ? 'Journey complete' : visible(2) ? 'Base360 processing' : 'Base360'}
                </p>
              </motion.div>

              {/* Workflow nodes grid */}
              <div className="grid w-full max-w-[280px] grid-cols-2 gap-2">
                {heroWorkflowNodes.map((node, i) => {
                  const threshold = 3 + i
                  const isVisible = visible(threshold)
                  const Icon = node.icon
                  return (
                    <motion.div
                      key={node.id}
                      className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-400 ${
                        isVisible
                          ? allDone
                            ? 'border-success/20 bg-success/5'
                            : 'border-primary/20 bg-violet-surface'
                          : 'border-line bg-surface-2/50 opacity-40'
                      }`}
                      initial={false}
                      animate={{
                        opacity: isVisible ? 1 : 0.4,
                        y: isVisible ? 0 : 8,
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Icon className={`h-3.5 w-3.5 shrink-0 ${isVisible ? (allDone ? 'text-success' : 'text-primary') : 'text-ink-muted'}`} />
                      <span className={`text-[12px] font-medium ${isVisible ? 'text-ink' : 'text-ink-muted'}`}>{node.label}</span>
                      {allDone && <CheckCircle2 className="ml-auto h-3 w-3 text-success" />}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Connector 2 (desktop horizontal) */}
            <Connector active={visible(8)} variant="horizontal" className="hidden lg:flex" />

            {/* Connector (mobile vertical) */}
            <div className="flex justify-center lg:hidden">
              <Connector active={visible(2)} variant="vertical" />
            </div>

            {/* ── Right: Customer won ── */}
            <motion.div
              className="relative z-10 flex flex-1 justify-center lg:justify-end"
              initial={false}
              animate={{
                opacity: visible(8) ? 1 : 0,
                y: visible(8) ? 0 : 16,
                scale: visible(8) ? 1 : 0.96,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-[240px] rounded-xl border border-line bg-surface p-4 shadow-float">
                <div className="mb-2.5 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-surface">
                    <span className="text-[11px] font-semibold text-primary">AC</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-ink">Alex Chen</p>
                    <span className="text-[10px] text-ink-muted">Customer</span>
                  </div>
                  <span className="ml-auto rounded-md bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">Won</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  <div>
                    <span className="text-[10px] text-ink-muted">Lead score</span>
                    <p className="text-[13px] font-semibold text-primary">92</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted">Campaign</span>
                    <p className="text-[13px] font-medium text-ink">Summer 2026</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 border-t border-line pt-2.5">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span className="text-[10px] font-medium text-success">Customer created</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function Connector({ active, variant, className = '' }: { active: boolean; variant: 'horizontal' | 'vertical'; className?: string }) {
  if (variant === 'horizontal') {
    return (
      <div className={`relative w-12 items-center justify-center ${className}`}>
        <div className={`h-px w-full transition-colors duration-500 ${active ? 'bg-primary/40' : 'bg-line'}`} />
        {active && (
          <motion.div
            className="absolute h-1.5 w-1.5 rounded-full bg-primary"
            initial={{ left: '0%' }}
            animate={{ left: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>
    )
  }
  return (
    <div className={`relative h-8 w-px items-center justify-center ${className}`}>
      <div className={`h-full w-px transition-colors duration-500 ${active ? 'bg-primary/40' : 'bg-line'}`} />
    </div>
  )
}
