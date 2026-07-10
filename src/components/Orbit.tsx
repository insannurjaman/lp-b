import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import type { LucideProps } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   Base360 Orbit System

   A reusable visual motif representing a customer conversation
   moving through the Base360 operating system.

   Components:
   - OrbitCore      → central processing hub
   - OrbitPath      → circular/arc connector paths
   - OrbitNode      → input/processing/output nodes
   - OrbitPulse     → animated signal traveling along paths
   - OrbitState     → stateful wrapper (inactive/active/done/success)
   - OrbitSuccess   → final won customer state
   ═══════════════════════════════════════════════════════════════ */

export type OrbitNodeStatus = 'inactive' | 'active' | 'done' | 'success'

export interface OrbitNodeData {
  id: string
  label: string
  icon: ComponentType<LucideProps>
}

/* ───────────────── OrbitCore ───────────────── */

interface OrbitCoreProps {
  size?: number
  active?: boolean
  complete?: boolean
  label?: string
  showPulse?: boolean
  showSignalDots?: boolean
}

export function OrbitCore({
  size = 72,
  active = false,
  complete = false,
  label,
  showPulse = true,
  showSignalDots = true,
}: OrbitCoreProps) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Pulsing rings when active */}
        {active && showPulse && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid rgba(102, 87, 255, 0.25)' }}
              animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid rgba(102, 87, 255, 0.15)' }}
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
            />
          </>
        )}

        {/* Success glow when complete */}
        {complete && showPulse && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(66, 184, 131, 0.2)' }}
            animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        {/* Outer ring — platform surface */}
        <div
          className={`absolute rounded-full border-2 transition-colors duration-500 ${
            complete
              ? 'border-success/30 bg-success/5'
              : active
              ? 'border-primary/30 bg-violet-surface/50'
              : 'border-line bg-surface'
          }`}
          style={{ width: size, height: size }}
        >
          {/* Inner ring — processing layer */}
          <div
            className={`absolute rounded-full border transition-colors duration-500 ${
              complete ? 'border-success/20' : active ? 'border-primary/20' : 'border-line/60'
            }`}
            style={{ inset: size * 0.14 }}
          >
            {/* Center mark container */}
            <div
              className="absolute flex items-center justify-center rounded-full transition-colors duration-500"
              style={{
                inset: size * 0.16,
                background: complete ? '#42B883' : active ? '#6657FF' : '#91919A',
              }}
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                style={{ width: size * 0.34, height: size * 0.34 }}
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="9" stroke="white" strokeOpacity="0.95" strokeWidth="2.2" />
                <circle cx="16" cy="6.5" r="2.8" fill="white" />
                <circle cx="25.5" cy="16" r="1.6" fill="white" fillOpacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Signal connection dots — input (left) and output (right) */}
          {showSignalDots && (
            <>
              <div
                className={`absolute top-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-500 ${
                  active ? 'border-primary bg-violet-surface' : complete ? 'border-success bg-success/10' : 'border-line bg-surface'
                }`}
                style={{ width: size * 0.16, height: size * 0.16, left: -(size * 0.08) }}
                aria-hidden="true"
              />
              <div
                className={`absolute top-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-500 ${
                  complete ? 'border-success bg-success/10' : active ? 'border-primary bg-violet-surface' : 'border-line bg-surface'
                }`}
                style={{ width: size * 0.16, height: size * 0.16, right: -(size * 0.08) }}
                aria-hidden="true"
              />
            </>
          )}
        </div>
      </div>
      {label && (
        <p className={`mt-3 text-[13px] font-medium transition-colors duration-500 ${
          complete ? 'text-success' : active ? 'text-primary' : 'text-ink-secondary'
        }`}>
          {label}
        </p>
      )}
    </div>
  )
}

/* ───────────────── OrbitPath ───────────────── */

interface OrbitPathProps {
  variant?: 'horizontal' | 'vertical' | 'arc'
  active?: boolean
  complete?: boolean
  className?: string
  length?: string
}

export function OrbitPath({ variant = 'horizontal', active = false, complete = false, className = '', length }: OrbitPathProps) {
  const color = complete ? 'bg-success/40' : active ? 'bg-primary/40' : 'bg-line'
  const style = length ? (variant === 'horizontal' ? { width: length } : { height: length }) : {}

  if (variant === 'horizontal') {
    return <div className={`h-px transition-colors duration-500 ${color} ${className}`} style={style} />
  }
  if (variant === 'vertical') {
    return <div className={`w-px transition-colors duration-500 ${color} ${className}`} style={style} />
  }
  // arc
  return (
    <svg className={className} viewBox="0 0 100 50" fill="none" aria-hidden="true" style={style}>
      <path d="M 2 48 Q 50 2 98 48" stroke={complete ? '#42B883' : active ? '#6657FF' : '#E5E5EA'} strokeWidth="1.5" fill="none" strokeOpacity={active || complete ? 0.5 : 1} />
    </svg>
  )
}

/* ───────────────── OrbitPulse ───────────────── */

interface OrbitPulseProps {
  active: boolean
  variant?: 'horizontal' | 'vertical'
  duration?: number
}

export function OrbitPulse({ active, variant = 'horizontal', duration = 2 }: OrbitPulseProps) {
  if (!active) return null

  if (variant === 'vertical') {
    return (
      <motion.div
        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary"
        style={{ boxShadow: '0 0 10px rgba(102,87,255,0.5)' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      />
    )
  }

  return (
    <motion.div
      className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary"
      style={{ boxShadow: '0 0 10px rgba(102,87,255,0.5)' }}
      animate={{ left: ['0%', '100%', '0%'] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ───────────────── OrbitNode ───────────────── */

interface OrbitNodeProps {
  icon: ComponentType<LucideProps>
  label: string
  status: OrbitNodeStatus
  size?: 'sm' | 'md'
  showCheck?: boolean
}

export function OrbitNode({ icon: Icon, label, status, size = 'md', showCheck = false }: OrbitNodeProps) {
  const dimensions = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  const styles: Record<OrbitNodeStatus, string> = {
    inactive: 'border-line bg-surface text-ink-muted',
    active: 'border-primary bg-violet-surface text-primary',
    done: 'border-success/30 bg-success/5 text-success',
    success: 'border-success bg-success text-white',
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`flex ${dimensions} items-center justify-center rounded-full border-2 transition-all duration-300 ${styles[status]}`}>
        {status === 'success' && showCheck ? <CheckCircle2 className="h-5 w-5" /> : <Icon className={iconSize} />}
      </div>
      <span className={`text-[12px] font-medium transition-colors duration-300 ${
        status === 'inactive' ? 'text-ink-muted' : status === 'active' ? 'text-primary' : status === 'success' ? 'text-success' : 'text-ink'
      }`}>
        {label}
      </span>
    </div>
  )
}

/* ───────────────── OrbitState ───────────────── */

interface OrbitStateProps {
  children: ReactNode
  status: OrbitNodeStatus
}

export function OrbitState({ children, status }: OrbitStateProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
        className={status === 'active' ? 'orbit-active' : status === 'success' ? 'orbit-success' : ''}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/* ───────────────── OrbitSuccess ───────────────── */

interface OrbitSuccessProps {
  person: string
  initials: string
  score?: string
  campaign?: string
  source?: string
  intent?: string
  leadStage?: string
}

export function OrbitSuccess({ person, initials, score, campaign, source, intent, leadStage }: OrbitSuccessProps) {
  return (
    <div className="relative rounded-xl border border-success/30 bg-success/5 p-5 shadow-float">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success/15">
          <span className="text-[14px] font-semibold text-success">{initials}</span>
        </div>
        <div>
          <p className="text-[15px] font-semibold text-ink">{person}</p>
          <span className="text-[13px] text-ink-secondary">Customer</span>
        </div>
        <span className="ml-auto rounded-md bg-success/15 px-2.5 py-1 text-[12px] font-semibold text-success">Won</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {source && (
          <div>
            <span className="text-[12px] text-ink-muted">Source</span>
            <p className="text-[14px] font-medium text-ink">{source}</p>
          </div>
        )}
        {intent && (
          <div>
            <span className="text-[12px] text-ink-muted">Intent</span>
            <p className="text-[14px] font-semibold text-success">{intent}</p>
          </div>
        )}
        {leadStage && (
          <div>
            <span className="text-[12px] text-ink-muted">Lead stage</span>
            <p className="text-[14px] font-semibold text-primary">{leadStage}</p>
          </div>
        )}
        {score && (
          <div>
            <span className="text-[12px] text-ink-muted">Lead score</span>
            <p className="text-[14px] font-semibold text-primary">{score}</p>
          </div>
        )}
        {campaign && (
          <div className="col-span-2">
            <span className="text-[12px] text-ink-muted">Campaign</span>
            <p className="text-[14px] font-medium text-ink">{campaign}</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-success/20 pt-3">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span className="text-[13px] font-medium text-success">Customer created</span>
      </div>
    </div>
  )
}

/* ───────────────── ChannelInput ───────────────── */

interface ChannelInputProps {
  icon: ComponentType<LucideProps>
  label: string
  active?: boolean
  variant?: 'light' | 'dark'
}

export function ChannelInput({ icon: Icon, label, active = false, variant = 'light' }: ChannelInputProps) {
  const base = variant === 'dark'
    ? active
      ? 'border-primary/40 bg-primary/10'
      : 'border-chapter-border bg-chapter-surface'
    : active
      ? 'border-primary/30 bg-violet-surface'
      : 'border-line bg-surface'

  const textColor = variant === 'dark'
    ? active ? 'text-primary' : 'text-chapter-secondary'
    : active ? 'text-primary' : 'text-ink-secondary'

  const iconBg = variant === 'dark'
    ? active ? 'bg-primary/15 text-primary' : 'bg-white/5 text-chapter-secondary'
    : active ? 'bg-primary/10 text-primary' : 'bg-surface-2 text-ink-muted'

  return (
    <div className={`flex items-center gap-3 rounded-lg border px-3.5 py-3 shadow-card transition-all duration-300 ${base}`}>
      <div className={`flex h-8 w-8 items-center justify-center rounded-md ${iconBg}`}>
        <Icon className="h-4 w-4" />
      </div>
      <span className={`text-[14px] font-medium ${textColor}`}>{label}</span>
      {active && <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-primary" />}
    </div>
  )
}

/* ───────────────── ActionNode ───────────────── */

interface ActionNodeProps {
  icon: ComponentType<LucideProps>
  label: string
  status: 'pending' | 'active' | 'done'
  variant?: 'light' | 'dark'
  compact?: boolean
}

export function ActionNode({ icon: Icon, label, status, variant = 'light', compact = false }: ActionNodeProps) {
  const isDark = variant === 'dark'
  const done = status === 'done'
  const active = status === 'active'

  const borderBg = isDark
    ? done ? 'border-success/25 bg-success/5' : active ? 'border-primary/40 bg-primary/10' : 'border-chapter-border bg-chapter-surface/50'
    : done ? 'border-success/25 bg-success/5' : active ? 'border-primary/30 bg-violet-surface' : 'border-line bg-surface-2/50'

  const iconColor = isDark
    ? done ? 'text-success' : active ? 'text-primary' : 'text-chapter-secondary'
    : done ? 'text-success' : active ? 'text-primary' : 'text-ink-muted'

  const textColor = isDark
    ? done ? 'text-chapter-text' : active ? 'text-primary' : 'text-chapter-secondary'
    : done ? 'text-ink' : active ? 'text-primary' : 'text-ink-muted'

  return (
    <div className={`flex items-center gap-2 rounded-lg border transition-all duration-300 ${borderBg} ${compact ? 'px-2.5 py-1.5' : 'px-3 py-2'}`}>
      {done ? (
        <CheckCircle2 className={`shrink-0 ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} ${iconColor}`} />
      ) : (
        <Icon className={`shrink-0 ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} ${iconColor}`} />
      )}
      <span className={`${compact ? 'text-[12px]' : 'text-[13px]'} font-medium ${textColor}`}>{label}</span>
    </div>
  )
}

/* ───────────────── OutcomeState ───────────────── */

interface OutcomeStateProps {
  label: string
  done?: boolean
  variant?: 'light' | 'dark'
}

export function OutcomeState({ label, done = false, variant = 'light' }: OutcomeStateProps) {
  const isDark = variant === 'dark'
  return (
    <div className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-3 shadow-card transition-colors duration-300 ${
      isDark
        ? done ? 'border-success/25 bg-success/5' : 'border-chapter-border bg-chapter-surface'
        : done ? 'border-success/20 bg-success/5' : 'border-line bg-surface'
    }`}>
      <div className={`flex h-7 w-7 items-center justify-center rounded-md ${
        isDark
          ? done ? 'bg-success/15 text-success' : 'bg-white/5 text-chapter-secondary'
          : done ? 'bg-success/10 text-success' : 'bg-surface-2 text-ink-muted'
      }`}>
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <div className="h-2 w-2 rounded-full bg-current opacity-40" />}
      </div>
      <span className={`text-[14px] font-medium ${isDark ? done ? 'text-chapter-text' : 'text-chapter-secondary' : done ? 'text-ink' : 'text-ink-secondary'}`}>
        {label}
      </span>
    </div>
  )
}

/* ───────────────── JourneyProgress ───────────────── */

interface JourneyProgressProps {
  current: number
  total: number
  variant?: 'light' | 'dark'
}

export function JourneyProgress({ current, total, variant = 'light' }: JourneyProgressProps) {
  const isDark = variant === 'dark'
  const pct = (current / total) * 100
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#E5E5EA' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: isDark ? '#6657FF' : '#6657FF' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className={`shrink-0 text-[13px] font-medium ${isDark ? 'text-chapter-secondary' : 'text-ink-muted'}`}>
        {current} / {total}
      </span>
    </div>
  )
}
