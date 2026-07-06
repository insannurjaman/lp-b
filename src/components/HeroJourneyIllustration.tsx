import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { RotateCcw, MessageCircle, CheckCircle2, ChevronRight } from 'lucide-react'
import Container from './Container'
import { OrbitCore, OrbitPath, OrbitPulse } from './Orbit'
import { heroJourneySteps, heroOrbitNodes } from '../data/content'

const TOTAL_STEPS = 9
const STEP_MS = 620

export default function HeroJourneyIllustration() {
  const [step, setStep] = useState(0)
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [playKey, setPlayKey] = useState(0)
  const [autoPlayed, setAutoPlayed] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setStep(TOTAL_STEPS)
      return
    }
    if (!inView || autoPlayed) return

    setAutoPlayed(true)
    setStep(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      timers.push(setTimeout(() => setStep(i), i * STEP_MS))
    }
    return () => timers.forEach(clearTimeout)
  }, [inView, reduceMotion, playKey, autoPlayed])

  const replay = () => {
    if (reduceMotion) return
    setStep(0)
    setAutoPlayed(false)
    setPlayKey((k) => k + 1)
  }

  const currentStepData = heroJourneySteps[step - 1]
  const allDone = step >= TOTAL_STEPS
  const isProcessing = step > 0 && !allDone
  const stepLabel = step === 0 ? 'Ready' : allDone ? 'Complete' : `Step ${step} of ${TOTAL_STEPS}`

  return (
    <div ref={sectionRef} className="relative mt-14 md:mt-20">
      <Container>
        <div
          className="relative overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-surface to-surface-2/40 shadow-lifted"
          style={{ perspective: '1600px' }}
        >
          {/* Dotted grid texture */}
          <div className="dotted-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          {/* Step indicator + replay */}
          <div className="relative flex items-center justify-between px-5 py-4 md:px-7 md:py-5">
            <div className="flex items-center gap-2.5">
              <div className={`relative h-2.5 w-2.5 rounded-full transition-colors duration-300 ${allDone ? 'bg-success' : isProcessing ? 'bg-primary' : 'bg-ink-muted'}`}>
                {isProcessing && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              <span className={`text-[13px] font-medium transition-colors duration-300 ${allDone ? 'text-success' : isProcessing ? 'text-primary' : 'text-ink-muted'}`}>
                {stepLabel}
              </span>
              {currentStepData && (
                <span className="hidden text-[13px] text-ink-secondary sm:inline">· {currentStepData.label}</span>
              )}
            </div>
            <button
              onClick={replay}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-line bg-surface/90 px-3 text-[13px] font-medium text-ink-secondary shadow-card backdrop-blur-sm transition-colors hover:text-ink hover:border-line-strong"
              aria-label="Replay journey animation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Replay
            </button>
          </div>

          {/* Reduced-motion visible stepper */}
          {reduceMotion && (
            <div className="relative flex flex-wrap items-center gap-1 px-5 pb-3 md:px-7">
              {heroJourneySteps.map((s, i) => (
                <div key={s.step} className="flex items-center gap-1">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-semibold ${i < TOTAL_STEPS ? 'bg-success/10 text-success' : 'bg-surface-2 text-ink-muted'}`}>
                    {s.step}
                  </span>
                  <span className="text-[12px] font-medium text-ink-secondary">{s.label}</span>
                  {i < heroJourneySteps.length - 1 && <ChevronRight className="h-3 w-3 text-ink-muted" />}
                </div>
              ))}
            </div>
          )}

          {/* Main composition with subtle perspective depth */}
          <div className="relative px-5 pb-7 md:px-7 md:pb-9 lg:px-10 lg:pb-11" style={{ transformStyle: 'preserve-3d' }}>
            <div
              className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_1.3fr_1fr] lg:gap-5"
              style={{ transform: !reduceMotion && inView ? 'rotateX(1.5deg)' : 'none', transition: 'transform 0.8s ease' }}
            >

              {/* Left: Comment card (enlarged) */}
              <div className="flex items-center justify-center">
                <motion.div
                  className="relative w-full max-w-[340px]"
                  initial={false}
                  animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -24 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ boxShadow: '0 8px 32px rgba(15,15,26,0.07), 0 2px 8px rgba(15,15,26,0.04)' }}
                >
                  <div className="rounded-xl border border-line bg-surface p-5 shadow-float">
                    <div className="mb-3 flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-ink">TikTok</p>
                        <span className="text-[12px] text-ink-muted">Comment · just now</span>
                      </div>
                      {step >= 1 && !allDone && (
                        <span className="ml-auto flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[12px] font-medium text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Incoming
                        </span>
                      )}
                    </div>
                    <p className="text-[17px] font-medium leading-snug text-ink">&ldquo;How much is this?&rdquo;</p>
                    <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-surface">
                        <span className="text-[11px] font-semibold text-primary">AC</span>
                      </div>
                      <span className="text-[14px] font-medium text-ink-secondary">Alex Chen</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Center: Orbit core + nodes */}
              <div className="flex flex-col items-center justify-center gap-6 py-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2">
                    <OrbitPath variant="horizontal" active={isProcessing} complete={allDone} />
                    {isProcessing && <OrbitPulse active variant="horizontal" duration={2.2} />}
                  </div>
                  <OrbitCore size={96} active={isProcessing} complete={allDone} label={allDone ? 'Journey complete' : isProcessing ? 'Base360 processing' : 'Base360'} showPulse={isProcessing} />
                </div>

                {/* Current step detail */}
                <AnimatePresence mode="wait">
                  {currentStepData && (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-[360px] rounded-lg border border-line bg-surface/85 p-4 shadow-card backdrop-blur-sm"
                    >
                      <p className="text-[14px] font-semibold text-ink">{currentStepData.label}</p>
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Customer</span>
                          <span className="text-[13px] text-ink-secondary">{currentStepData.customerAction}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-primary">Base360</span>
                          <span className="text-[13px] text-ink-secondary">{currentStepData.base360Action}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-success">Record</span>
                          <span className="text-[13px] font-medium text-ink">{currentStepData.recordUpdate}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Orbit nodes around core */}
                <div className="grid w-full max-w-[380px] grid-cols-2 gap-2">
                  {heroOrbitNodes.map((node, i) => {
                    const nodeStep = i + 2
                    const isNodeActive = step === nodeStep
                    const isNodeDone = step > nodeStep
                    const nodeStatus = allDone ? 'done' : isNodeActive ? 'active' : isNodeDone ? 'done' : 'inactive'
                    const Icon = node.icon
                    return (
                      <motion.div
                        key={node.id}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300 ${
                          nodeStatus === 'active' ? 'border-primary/30 bg-violet-surface' :
                          nodeStatus === 'done' ? 'border-success/20 bg-success/5' :
                          'border-line bg-surface/50 opacity-50'
                        }`}
                        initial={false}
                        animate={{ opacity: nodeStatus === 'inactive' ? 0.5 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${nodeStatus === 'active' ? 'text-primary' : nodeStatus === 'done' ? 'text-success' : 'text-ink-muted'}`} />
                        <span className={`text-[13px] font-medium ${nodeStatus === 'inactive' ? 'text-ink-muted' : 'text-ink'}`}>{node.label}</span>
                        {nodeStatus === 'done' && <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-success" />}
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Right: Customer record (evolving, enlarged) */}
              <div className="flex items-center justify-center">
                <motion.div
                  className="w-full max-w-[340px]"
                  initial={false}
                  animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : 24 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ boxShadow: '0 8px 32px rgba(15,15,26,0.07), 0 2px 8px rgba(15,15,26,0.04)' }}
                >
                  <CustomerRecordCard step={step} allDone={allDone} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/* Customer record card that evolves */
function CustomerRecordCard({ step, allDone }: { step: number; allDone: boolean }) {
  const leadStage = step >= 9 ? 'Customer' : step >= 6 ? 'Qualified' : step >= 5 ? 'Scored' : step >= 3 ? 'Contacted' : 'New'
  const intent = step >= 5 ? 'High' : 'Unknown'
  const score = step >= 5 ? '92' : '—'
  const source = step >= 3 ? 'TikTok → IG' : 'TikTok'
  const campaign = step >= 8 ? 'Summer 2026' : '—'
  const nextAction = step >= 9 ? '—' : step >= 7 ? 'Demo Thu 2pm' : step >= 6 ? 'Schedule demo' : step >= 5 ? 'Qualify' : 'Respond'

  return (
    <div className={`rounded-xl border bg-surface p-5 shadow-float transition-colors duration-500 ${allDone ? 'border-success/30' : 'border-line'}`}>
      <div className="mb-4 flex items-center gap-2.5">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 ${allDone ? 'bg-success/15' : 'bg-violet-surface'}`}>
          <span className={`text-[14px] font-semibold transition-colors duration-500 ${allDone ? 'text-success' : 'text-primary'}`}>AC</span>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-ink">Alex Chen</p>
          <span className="text-[13px] text-ink-muted">{allDone ? 'Customer' : leadStage}</span>
        </div>
        <span className={`ml-auto rounded-md px-2 py-0.5 text-[12px] font-medium transition-colors duration-500 ${allDone ? 'bg-success/10 text-success' : 'bg-violet-surface text-primary'}`}>
          {leadStage}
        </span>
      </div>

      <div className="space-y-2.5">
        <RecordField label="Intent" value={intent} accent={step >= 5 ? 'success' : 'default'} />
        <RecordField label="Lead score" value={score} accent={step >= 5 ? 'violet' : 'default'} />
        <RecordField label="Source" value={source} />
        <RecordField label="Campaign" value={campaign} accent={step >= 8 ? 'violet' : 'default'} />
        <RecordField label="Next action" value={nextAction} accent={step >= 6 ? 'violet' : 'default'} />
      </div>

      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="mt-3 flex items-center gap-2 border-t border-success/20 pt-3"
          >
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-[13px] font-medium text-success">Customer created · Won</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RecordField({ label, value, accent = 'default' }: { label: string; value: string; accent?: 'violet' | 'success' | 'default' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-ink-muted">{label}</span>
      <span className={`text-[14px] font-medium transition-colors duration-300 ${accent === 'violet' ? 'text-primary' : accent === 'success' ? 'text-success' : 'text-ink'}`}>
        {value}
      </span>
    </div>
  )
}
