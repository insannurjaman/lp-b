import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, MessageCircle, CheckCircle2, ChevronRight, Send, Zap, User, PhoneCall, Mail } from 'lucide-react'
import Container from './Container'
import { OrbitCore, OrbitPath, OrbitPulse } from './Orbit'
import { heroJourneySteps } from '../data/content'

const TOTAL_STEPS = 9
const STEP_MS = 700
const AUTOPLAY_DELAY = 700

type JourneyState = 'idle' | 'processing' | 'completed'

export default function HeroJourneyIllustration() {
  const [step, setStep] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [autoPlayed, setAutoPlayed] = useState(false)
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  const allDone = step >= TOTAL_STEPS
  const isProcessing = hasStarted && step > 0 && !allDone
  const journeyState: JourneyState = allDone ? 'completed' : isProcessing ? 'processing' : 'idle'

  // Autoplay once after canvas becomes visible
  useEffect(() => {
    if (reduceMotion) {
      setStep(TOTAL_STEPS)
      setHasStarted(true)
      return
    }
    if (!inView || autoPlayed) return

    setAutoPlayed(true)
    const startTimer = setTimeout(() => {
      setHasStarted(true)
      setStep(1)
      const timers: ReturnType<typeof setTimeout>[] = []
      for (let i = 2; i <= TOTAL_STEPS; i++) {
        timers.push(setTimeout(() => setStep(i), (i - 1) * STEP_MS))
      }
    }, AUTOPLAY_DELAY)

    return () => clearTimeout(startTimer)
  }, [inView, reduceMotion, autoPlayed])

  const play = () => {
    if (reduceMotion) return
    setHasStarted(true)
    setStep(1)
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 2; i <= TOTAL_STEPS; i++) {
      timers.push(setTimeout(() => setStep(i), (i - 1) * STEP_MS))
    }
  }

  const replay = () => {
    if (reduceMotion) return
    setStep(0)
    setHasStarted(false)
    setTimeout(() => play(), 200)
  }

  const currentStepData = heroJourneySteps[step - 1]
  const statusLabel = journeyState === 'completed' ? 'Customer won' : isProcessing ? 'Processing' : 'Ready'
  const progressLabel = isProcessing ? `Step ${step} of ${TOTAL_STEPS}` : journeyState === 'completed' ? 'Complete' : 'Ready to play'

  return (
    <div ref={sectionRef} className="relative mt-10 md:mt-14">
      <Container>
        <div
          className="relative overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-surface to-surface-2/40 shadow-lifted"
          style={{ perspective: '1600px' }}
          role="region"
          aria-label="Base360 journey demonstration"
        >
          {/* Dotted grid texture */}
          <div className="dotted-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          {/* Status bar + controls */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-7 md:py-5">
            <div className="flex items-center gap-2.5" aria-live="polite">
              <div className={`relative h-2.5 w-2.5 rounded-full transition-colors duration-300 ${allDone ? 'bg-success' : isProcessing ? 'bg-primary' : 'bg-ink-muted'}`}>
                {isProcessing && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              <span className={`text-[14px] font-medium transition-colors duration-300 ${allDone ? 'text-success' : isProcessing ? 'text-primary' : 'text-ink-secondary'}`}>
                {statusLabel}
              </span>
              {isProcessing && (
                <span className="text-[14px] text-ink-muted">{progressLabel}</span>
              )}
              {currentStepData && isProcessing && (
                <span className="hidden text-[14px] text-ink-secondary sm:inline">{currentStepData.label}</span>
              )}
            </div>

            {/* Primary control */}
            {journeyState === 'idle' && !reduceMotion && (
              <button
                onClick={play}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-[14px] font-medium text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-float"
                aria-label="Play journey animation"
              >
                <Play className="h-4 w-4" />
                Play journey
              </button>
            )}
            {journeyState === 'processing' && !reduceMotion && (
              <div className="inline-flex h-11 items-center gap-2 rounded-xl border border-primary/20 bg-violet-surface px-5 text-[14px] font-medium text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                Processing
              </div>
            )}
            {journeyState === 'completed' && !reduceMotion && (
              <button
                onClick={replay}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-[14px] font-medium text-ink-secondary shadow-card transition-all hover:text-ink hover:border-line-strong"
                aria-label="Replay journey animation"
              >
                <RotateCcw className="h-4 w-4" />
                Replay journey
              </button>
            )}
          </div>

          {/* Reduced-motion visible stepper */}
          {reduceMotion && (
            <div className="relative flex flex-wrap items-center gap-1.5 px-5 pb-3 md:px-7">
              {heroJourneySteps.map((s) => (
                <div key={s.step} className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-success/10 text-[12px] font-semibold text-success">
                    {s.step}
                  </span>
                  <span className="text-[13px] font-medium text-ink-secondary">{s.label}</span>
                  {s.step < TOTAL_STEPS && <ChevronRight className="h-3 w-3 text-ink-muted" />}
                </div>
              ))}
            </div>
          )}

          {/* Main composition */}
          <div className="relative px-5 pb-7 md:px-7 md:pb-9 lg:px-10 lg:pb-11" style={{ transformStyle: 'preserve-3d' }}>
            {/* Mobile vertical signal path */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-line via-primary/20 to-line lg:hidden" aria-hidden="true" />
            <div
              className="relative grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-4"
              style={{ transform: !reduceMotion && inView ? 'rotateX(1.5deg)' : 'none', transition: 'transform 0.8s ease' }}
            >
              {/* LEFT: Incoming conversation */}
              <div className="flex items-center justify-center">
                <CommentCard step={step} allDone={allDone} isProcessing={isProcessing} />
              </div>

              {/* CENTER: Base360 orchestration core */}
              <div className="flex flex-col items-center justify-center gap-5 py-2">
                <CoreOrchestration step={step} allDone={allDone} isProcessing={isProcessing} />
                {currentStepData && !reduceMotion && (
                  <StepDetail step={step} data={currentStepData} />
                )}
              </div>

              {/* RIGHT: Evolving customer record */}
              <div className="flex items-center justify-center">
                <CustomerRecordCard step={step} allDone={allDone} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/* ───────────────── Comment Card ───────────────── */
function CommentCard({ step, allDone, isProcessing }: { step: number; allDone: boolean; isProcessing: boolean }) {
  const showReply = step >= 2
  const incoming = step >= 1 && !allDone

  return (
    <div
      className="relative w-full max-w-[340px] rounded-xl border border-line bg-surface p-5 shadow-float"
      style={{ boxShadow: '0 8px 32px rgba(15,15,26,0.07), 0 2px 8px rgba(15,15,26,0.04)' }}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink">
          <MessageCircle className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-[15px] font-semibold text-ink">TikTok</p>
          <span className="text-[13px] text-ink-muted">Comment just now</span>
        </div>
        {incoming && (
          <span className="ml-auto flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[12px] font-medium text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Incoming
          </span>
        )}
        {allDone && (
          <span className="ml-auto flex items-center gap-1.5 rounded-md bg-success/10 px-2 py-1 text-[12px] font-medium text-success">
            <CheckCircle2 className="h-3 w-3" />
            Handled
          </span>
        )}
      </div>

      {/* Customer comment */}
      <p className="text-[16px] font-medium leading-snug text-ink">&ldquo;How much is this?&rdquo;</p>

      {/* Customer identity */}
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-surface">
          <span className="text-[12px] font-semibold text-primary">AC</span>
        </div>
        <span className="text-[14px] font-medium text-ink-secondary">Alex Chen</span>
      </div>

      {/* AI reply appears at step 2 */}
      <AnimatePresence>
        {showReply && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-lg bg-violet-surface p-3">
              <div className="mb-1.5 flex items-center gap-1.5">
                <Send className="h-3 w-3 text-primary" />
                <span className="text-[12px] font-medium text-primary">Base360 reply</span>
              </div>
              <p className="text-[14px] leading-snug text-ink">Hi Alex! I&apos;ve sent pricing to your DMs. Let me know which plan works for you.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection indicator */}
      <div className="mt-3 flex items-center gap-2">
        <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${isProcessing || allDone ? 'bg-primary' : 'bg-ink-muted'}`} />
        <span className="text-[12px] text-ink-muted">{allDone ? 'Connected to Base360' : isProcessing ? 'Signal active' : 'Awaiting connection'}</span>
      </div>
    </div>
  )
}

/* ───────────────── Core Orchestration ───────────────── */
function CoreOrchestration({ step, allDone, isProcessing }: { step: number; allDone: boolean; isProcessing: boolean }) {
  const actionNodes = [
    { id: 'reply', label: 'Public reply', icon: Send, step: 2 },
    { id: 'dm', label: 'Private DM', icon: MessageCircle, step: 3 },
    { id: 'answers', label: 'Questions answered', icon: MessageCircle, step: 4 },
    { id: 'qualify', label: 'Intent qualified', icon: Zap, step: 5 },
    { id: 'crm', label: 'CRM created', icon: User, step: 6 },
    { id: 'call', label: 'AI call', icon: PhoneCall, step: 7 },
    { id: 'campaign', label: 'Campaign activated', icon: Mail, step: 8 },
  ]

  return (
    <div className="relative flex w-full max-w-[420px] flex-col items-center">
      {/* Horizontal connection paths */}
      <div className="absolute left-0 right-0 top-[60px] hidden lg:block">
        <div className="relative">
          <OrbitPath variant="horizontal" active={isProcessing} complete={allDone} className="w-full" />
          {isProcessing && <OrbitPulse active variant="horizontal" duration={2.5} />}
        </div>
      </div>

      {/* Core */}
      <OrbitCore
        size={120}
        active={isProcessing}
        complete={allDone}
        label={allDone ? 'Journey complete' : isProcessing ? 'Base360 processing' : 'Base360 ready'}
        showPulse={isProcessing || allDone}
        showSignalDots={true}
      />

      {/* Action nodes grid */}
      <div className="mt-6 grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {actionNodes.map((node) => {
          const isNodeActive = step === node.step
          const isNodeDone = step > node.step || allDone
          const status = isNodeDone ? 'done' : isNodeActive ? 'active' : 'pending'
          const Icon = node.icon
          return (
            <div
              key={node.id}
              className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-all duration-300 ${
                status === 'active'
                  ? 'border-primary/40 bg-violet-surface shadow-card'
                  : status === 'done'
                  ? 'border-success/25 bg-success/5'
                  : 'border-line bg-surface-2/50'
              }`}
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                status === 'active' ? 'bg-primary/15' : status === 'done' ? 'bg-success/15' : 'bg-surface-2'
              }`}>
                {status === 'done' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                ) : (
                  <Icon className={`h-3.5 w-3.5 ${status === 'active' ? 'text-primary' : 'text-ink-muted'}`} />
                )}
              </div>
              <span className={`text-[13px] font-medium ${
                status === 'active' ? 'text-primary' : status === 'done' ? 'text-ink' : 'text-ink-muted'
              }`}>
                {node.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ───────────────── Step Detail ───────────────── */
function StepDetail({ step, data }: { step: number; data: typeof heroJourneySteps[0] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[400px] rounded-lg border border-line bg-surface/90 p-4 shadow-card backdrop-blur-sm"
      >
        <p className="text-[14px] font-semibold text-ink">{data.label}</p>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-ink-muted">Customer</span>
            <span className="text-[14px] text-ink-secondary">{data.customerAction}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-primary">Base360</span>
            <span className="text-[14px] text-ink-secondary">{data.base360Action}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-success">Record</span>
            <span className="text-[14px] font-medium text-ink">{data.recordUpdate}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ───────────────── Customer Record Card ───────────────── */
function CustomerRecordCard({ step, allDone }: { step: number; allDone: boolean }) {
  // Evolving field values based on step
  const leadStage = step >= 9 ? 'Customer' : step >= 6 ? 'Qualified' : step >= 5 ? 'Scored' : step >= 3 ? 'Contacted' : 'New'
  const intent = step >= 5 ? 'High' : 'Unknown'
  const score = step >= 5 ? '92' : '\u2014'
  const channels = step >= 8 ? 'TikTok, IG, Voice, Email' : step >= 7 ? 'TikTok, IG, Voice' : step >= 3 ? 'TikTok, Instagram' : 'TikTok'
  const campaign = step >= 8 ? 'Summer 2026' : 'None'
  const nextAction = step >= 9 ? 'Complete' : step >= 7 ? 'Demo Thu 2pm' : step >= 6 ? 'Schedule demo' : step >= 5 ? 'Qualify' : 'Respond'
  const owner = step >= 6 ? 'AI Agent' : '\u2014'
  const outcome = step >= 9 ? 'Won' : '\u2014'

  return (
    <div className={`relative w-full max-w-[340px] rounded-xl border bg-surface p-5 shadow-float transition-colors duration-500 ${allDone ? 'border-success/30' : 'border-line'}`}
      style={{ boxShadow: '0 8px 32px rgba(15,15,26,0.07), 0 2px 8px rgba(15,15,26,0.04)' }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 ${allDone ? 'bg-success/15' : 'bg-violet-surface'}`}>
          <span className={`text-[14px] font-semibold transition-colors duration-500 ${allDone ? 'text-success' : 'text-primary'}`}>AC</span>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-ink">Alex Chen</p>
          <span className="text-[13px] text-ink-muted">{allDone ? 'Customer' : leadStage}</span>
        </div>
        <span className={`ml-auto rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors duration-500 ${allDone ? 'bg-success/10 text-success' : 'bg-violet-surface text-primary'}`}>
          {leadStage}
        </span>
      </div>

      {/* Fields */}
      <div className="space-y-2.5">
        <RecordField label="Intent" value={intent} accent={step >= 5 ? 'success' : 'default'} />
        <RecordField label="Lead score" value={score} accent={step >= 5 ? 'violet' : 'default'} />
        <RecordField label="Channels" value={channels} />
        <RecordField label="Owner" value={owner} accent={step >= 6 ? 'violet' : 'default'} />
        <RecordField label="Campaign" value={campaign} accent={step >= 8 ? 'violet' : 'default'} />
        <RecordField label="Next action" value={nextAction} accent={step >= 6 ? 'violet' : 'default'} />
        {step >= 9 && <RecordField label="Outcome" value={outcome} accent="success" />}
      </div>

      {/* Won badge */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="mt-3 flex items-center gap-2 border-t border-success/20 pt-3"
          >
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-[14px] font-medium text-success">Customer created</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RecordField({ label, value, accent = 'default' }: { label: string; value: string; accent?: 'violet' | 'success' | 'default' }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="shrink-0 text-[13px] text-ink-muted">{label}</span>
      <span className={`text-right text-[14px] font-medium transition-colors duration-300 ${accent === 'violet' ? 'text-primary' : accent === 'success' ? 'text-success' : 'text-ink'}`}>
        {value}
      </span>
    </div>
  )
}
