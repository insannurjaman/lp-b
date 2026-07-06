import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Reply,
  MessagesSquare,
  BrainCircuit,
  UserPlus,
  PhoneCall,
} from 'lucide-react'
import { journeySteps } from '../data/journeySteps'
import Container from './Container'
import SectionHeading from './SectionHeading'

const stepIcons = [
  MessageCircle,
  Reply,
  MessagesSquare,
  BrainCircuit,
  UserPlus,
  PhoneCall,
]

export default function JourneySection() {
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    journeySteps.forEach((_, i) => {
      const el = stepRefs.current[i]
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i)
          }
        },
        { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  const currentStep = journeySteps[activeStep] || journeySteps[0]

  return (
    <section id="journey" className="bg-light-bg py-28 md:py-36">
      <Container>
        <SectionHeading
          title="Watch one comment become a customer."
          subtitle="Base360 turns every conversation into a connected, automated customer journey."
        />
      </Container>

      {/* Desktop: side-by-side */}
      <div className="mt-16 hidden lg:block">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-16 px-20">
          {/* Sticky visualization */}
          <div className="sticky top-28 h-[calc(100vh-10rem)]">
            <div className="flex h-full items-center">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="rounded-2xl border border-primary/20 bg-base-950 p-6 shadow-xl shadow-primary/5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                      {(() => {
                        const Icon = stepIcons[activeStep] || MessageCircle
                        return <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      })()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Step {currentStep.number}
                      </p>
                      <p className="text-lg font-semibold text-dark-mode-text">
                        {currentStep.title}
                      </p>
                    </div>
                  </div>

                  {/* Mock product UI */}
                  <div className="space-y-3 rounded-xl border border-white/10 bg-base-900/50 p-4">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        AC
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-dark-mode-text">
                          Alex Chen
                        </p>
                        <p className="text-[11px] text-dark-mode-secondary/50">
                          {currentStep.title} · Just now
                        </p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-success" />
                    </div>
                    <p className="text-sm leading-relaxed text-dark-mode-secondary">
                      {currentStep.detail}
                    </p>
                    {/* Step-specific detail */}
                    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                      <p className="text-xs text-dark-mode-secondary/60">
                        {currentStep.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrollable steps */}
          <div className="space-y-32 pb-20">
            {journeySteps.map((step, i) => {
              const isActive = i === activeStep
              const isPast = i < activeStep

              return (
                <div
                  key={step.number}
                  ref={(el) => { stepRefs.current[i] = el }}
                  className={`transition-opacity duration-300 ${
                    (!isActive && !isPast) ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : isPast
                            ? 'bg-primary/15 text-primary'
                            : 'border border-dark-text/10 text-muted-text'
                      }`}
                    >
                      <span className="text-sm font-bold">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-dark-text">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-base text-muted-text">
                        {step.description}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-text/80">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: vertical sequence */}
      <div className="mt-12 px-5 lg:hidden">
        <div className="space-y-8">
          {journeySteps.map((step) => {
            return (
              <div
                key={step.number}
                className="rounded-2xl border border-dark-text/8 bg-light-surface p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-sm font-bold text-primary">{step.number}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Step {step.number}
                    </p>
                    <h3 className="text-base font-semibold text-dark-text">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-muted-text">{step.description}</p>
                <div className="mt-3 rounded-lg border border-dark-text/5 bg-base-950/[0.02] px-3 py-2">
                  <p className="text-xs text-muted-text/80">{step.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
