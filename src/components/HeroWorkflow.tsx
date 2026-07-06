import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  Reply,
  MessagesSquare,
  BrainCircuit,
  UserPlus,
  PhoneCall,
  TrendingUp,
  Trophy,
} from 'lucide-react'

interface WorkflowStep {
  id: string
  icon: typeof MessageCircle
  label: string
  detail?: string
  highlight?: boolean
}

const steps: WorkflowStep[] = [
  { id: 'comment', icon: MessageCircle, label: 'TikTok · Just now', detail: '"How much is this?"' },
  { id: 'reply', icon: Reply, label: 'Public reply sent', detail: '"Sent the details to your DMs."' },
  { id: 'dm', icon: MessagesSquare, label: 'Private conversation', detail: '"Which option are you interested in?"' },
  { id: 'qualify', icon: BrainCircuit, label: 'AI qualification', detail: 'Questions answered · Intent confirmed' },
  { id: 'crm', icon: UserPlus, label: 'CRM', detail: 'New lead created · High intent' },
  { id: 'voice', icon: PhoneCall, label: 'AI voice', detail: 'Follow-up call completed' },
  { id: 'marketing', icon: TrendingUp, label: 'Marketing', detail: 'Added to nurture sequence' },
  { id: 'outcome', icon: Trophy, label: 'Customer won', detail: 'Ready to close', highlight: true },
]

const STEP_HEIGHT = 80
const DOT_CENTER_OFFSET = 31

export default function HeroWorkflow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAnimation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= steps.length - 1) return 0
        return prev + 1
      })
    }, 2200)
  }, [])

  useEffect(() => {
    startAnimation()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startAnimation])

  return (
    <div
      className="relative w-full max-w-[400px]"
      role="img"
      aria-label="Base360 workflow animation showing a TikTok comment becoming a customer through automated steps"
    >
      {/* Vertical connecting line */}
      <div
        className="absolute left-[23px] top-0 bottom-0 w-px bg-white/10"
        aria-hidden="true"
      />

      {/* Animated signal dot */}
      <motion.div
        className="absolute left-[17px] z-20 h-[14px] w-[14px] rounded-full bg-primary shadow-lg shadow-primary/60"
        aria-hidden="true"
        animate={{
          top: activeIndex * STEP_HEIGHT + DOT_CENTER_OFFSET - 7,
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      />

      {/* Steps */}
      <div className="relative flex flex-col">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === activeIndex
          const isCompleted = index < activeIndex
          const isHighlighted = step.highlight

          return (
            <div
              key={step.id}
              className="relative flex items-start gap-4 py-2 min-h-[80px]"
            >
              {/* Timeline node */}
              <div className="relative z-10 flex shrink-0 items-center justify-center">
                <div
                  className={`flex h-[46px] w-[46px] items-center justify-center rounded-xl border transition-all duration-500 ${
                    isActive
                      ? 'border-primary/40 bg-primary/15'
                      : isCompleted
                        ? 'border-primary/20 bg-primary/8'
                        : 'border-white/8 bg-white/5'
                  }`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] transition-all duration-500 ${
                      isActive || isCompleted
                        ? 'text-primary'
                        : 'text-dark-mode-secondary/50'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Card */}
              <div
                className={`min-w-0 flex-1 rounded-xl border px-4 py-3 transition-all duration-500 ${
                  isActive
                    ? 'border-primary/25 bg-primary/8 shadow-lg shadow-primary/5'
                    : isCompleted
                      ? 'border-white/8 bg-white/[0.03]'
                      : 'border-white/5 bg-white/[0.02]'
                } ${isHighlighted && isActive ? 'border-success/30 bg-success/5' : ''}`}
              >
                <p
                  className={`truncate text-sm font-medium transition-colors duration-500 ${
                    isActive || isCompleted
                      ? 'text-dark-mode-text'
                      : 'text-dark-mode-secondary/60'
                  }`}
                >
                  {step.label}
                </p>
                {step.detail && (
                  <p
                    className={`mt-0.5 truncate text-xs transition-colors duration-500 ${
                      isActive
                        ? 'text-dark-mode-secondary'
                        : 'text-dark-mode-secondary/40'
                    }`}
                  >
                    {step.detail}
                  </p>
                )}
              </div>

              {/* Glow */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute -inset-1 rounded-xl"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(98,84,255,0.2), transparent)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-center text-xs text-dark-mode-secondary/40">
        {activeIndex + 1} / {steps.length}
      </p>
    </div>
  )
}
