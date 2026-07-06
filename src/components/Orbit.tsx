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
}

export function OrbitCore({ size = 72, active = false, complete = false, label, showPulse = true }: OrbitCoreProps) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Pulsing rings when active */}
        {active && showPulse && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid rgba(102, 87, 255, 0.2)' }}
              animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid rgba(102, 87, 255, 0.15)' }}
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />
          </>
        )}

        {/* Core circle */}
        <div
          className={`relative flex items-center justify-center rounded-full border-2 transition-colors duration-500 ${
            complete
              ? 'border-success/40 bg-success/5'
              : active
              ? 'border-primary/40 bg-violet-surface'
              : 'border-line bg-surface'
          }`}
          style={{ width: size, height: size }}
        >
          {/* Inner ring */}
          <div
            className={`absolute rounded-full border transition-colors duration-500 ${
              complete ? 'border-success/20' : active ? 'border-primary/20' : 'border-line/50'
            }`}
            style={{ inset: size * 0.18 }}
          />
          {/* Center mark */}
          <svg viewBox="0 0 32 32" fill="none" style={{ width: size * 0.5, height: size * 0.5 }} aria-hidden="true">
            <rect x="1" y="1" width="30" height="30" rx="9" fill={complete ? '#42B883' : '#6657FF'} />
            <circle cx="16" cy="16" r="8.5" stroke="white" strokeOpacity="0.9" strokeWidth="2" />
            <circle cx="16" cy="7.5" r="2.6" fill="white" />
          </svg>
        </div>
      </div>
      {label && (
        <p className={`mt-2.5 text-[12px] font-medium transition-colors duration-500 ${
          complete ? 'text-success' : active ? 'text-primary' : 'text-ink-muted'
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
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"
        style={{ boxShadow: '0 0 8px rgba(102,87,255,0.4)' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      />
    )
  }

  return (
    <motion.div
      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"
      style={{ boxShadow: '0 0 8px rgba(102,87,255,0.4)' }}
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
}

export function OrbitSuccess({ person, initials, score, campaign }: OrbitSuccessProps) {
  return (
    <div className="relative rounded-xl border border-success/30 bg-success/5 p-4 shadow-float">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15">
          <span className="text-[13px] font-semibold text-success">{initials}</span>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-ink">{person}</p>
          <span className="text-[12px] text-ink-muted">Customer</span>
        </div>
        <span className="ml-auto rounded-md bg-success/15 px-2 py-0.5 text-[12px] font-medium text-success">Won</span>
      </div>
      {(score || campaign) && (
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {score && (
            <div>
              <span className="text-[11px] text-ink-muted">Lead score</span>
              <p className="text-[13px] font-semibold text-primary">{score}</p>
            </div>
          )}
          {campaign && (
            <div>
              <span className="text-[11px] text-ink-muted">Campaign</span>
              <p className="text-[13px] font-medium text-ink">{campaign}</p>
            </div>
          )}
        </div>
      )}
      <div className="mt-3 flex items-center gap-1.5 border-t border-success/20 pt-2.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
        <span className="text-[12px] font-medium text-success">Customer created</span>
      </div>
    </div>
  )
}
