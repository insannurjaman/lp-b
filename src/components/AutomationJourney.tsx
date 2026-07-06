import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Play, RotateCcw, CheckCircle2 } from 'lucide-react'
import Container from './Container'
import { automationStages } from '../data/content'

export default function AutomationJourney() {
  const [activeStep, setActiveStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const reduceMotion = useReducedMotion()
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const play = () => {
    if (reduceMotion) {
      setActiveStep(automationStages.length - 1)
      return
    }
    clearTimers()
    setActiveStep(-1)
    setPlaying(true)
    automationStages.forEach((_, i) => {
      timersRef.current.push(
        setTimeout(() => {
          setActiveStep(i)
          if (i === automationStages.length - 1) setPlaying(false)
        }, (i + 1) * 600)
      )
    })
  }

  const reset = () => {
    clearTimers()
    setPlaying(false)
    setActiveStep(-1)
  }

  useEffect(() => () => clearTimers(), [])

  return (
    <section className="bg-surface py-20 md:py-28 lg:py-32">
      <Container>
        {/* Heading + control */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-balance">
              One conversation.
              <br />
              Every next step connected.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary text-pretty">
              From a single comment to a closed customer — every stage orchestrated automatically.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={play}
              disabled={playing}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[14px] font-medium text-white shadow-card transition-colors hover:bg-primary-hover disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
              Play journey
            </button>
            <button
              onClick={reset}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-ink-secondary transition-colors hover:text-ink hover:border-line-strong"
              aria-label="Reset journey"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Journey flow */}
        <div className="mt-14 md:mt-20">
          {/* Desktop: horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Base line */}
              <div className="absolute left-0 right-0 top-7 h-px bg-line" />
              {/* Progress line */}
              <motion.div
                className="absolute left-0 top-7 h-px bg-primary"
                animate={{ width: `${activeStep >= 0 ? ((activeStep + 1) / automationStages.length) * 100 : 0}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <div className="relative grid grid-cols-8 gap-2">
                {automationStages.map((stage, i) => {
                  const Icon = stage.icon
                  const isActive = i === activeStep
                  const isDone = i < activeStep
                  const isReached = i <= activeStep
                  const isFinal = i === automationStages.length - 1 && i === activeStep
                  return (
                    <div key={stage.id} className="flex flex-col items-center text-center">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isFinal
                            ? 'border-success bg-success text-white'
                            : isActive
                            ? 'border-primary bg-violet-surface text-primary'
                            : isDone
                            ? 'border-success/30 bg-success/5 text-success'
                            : 'border-line bg-surface text-ink-muted'
                        }`}
                      >
                        {isFinal ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <span className={`mt-3 text-[13px] font-medium transition-colors duration-300 ${isReached ? 'text-ink' : 'text-ink-muted'}`}>
                        {stage.label}
                      </span>
                      {isActive && (
                        <motion.span
                          className="mt-1 text-[10px] font-medium text-primary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Active
                        </motion.span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile / tablet: vertical */}
          <div className="lg:hidden">
            <div className="relative space-y-5">
              {automationStages.map((stage, i) => {
                const Icon = stage.icon
                const isActive = i === activeStep
                const isDone = i < activeStep
                const isReached = i <= activeStep
                const isFinal = i === automationStages.length - 1 && i === activeStep
                return (
                  <div key={stage.id} className="relative flex items-center gap-3.5">
                    {/* Vertical line */}
                    {i < automationStages.length - 1 && (
                      <div className="absolute left-5 top-12 h-[calc(100%-12px)] w-px bg-line" />
                    )}
                    <div
                      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isFinal
                          ? 'border-success bg-success text-white'
                          : isActive
                          ? 'border-primary bg-violet-surface text-primary'
                          : isDone
                          ? 'border-success/30 bg-success/5 text-success'
                          : 'border-line bg-surface text-ink-muted'
                      }`}
                    >
                      {isFinal ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className={`text-[15px] font-medium transition-colors duration-300 ${isReached ? 'text-ink' : 'text-ink-muted'}`}>
                      {stage.label}
                    </span>
                    {isActive && <span className="ml-auto text-[11px] font-medium text-primary">Active</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
