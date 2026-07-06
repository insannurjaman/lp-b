import { motion } from 'framer-motion'

interface Point {
  x: number
  y: number
}

interface ConversationSignalProps {
  points: Point[]
  progress: number
  color?: string
}

export default function ConversationSignal({ points, progress, color = '#5c4bff' }: ConversationSignalProps) {
  if (points.length < 2) return null

  const totalSegments = points.length - 1
  const clampedProgress = Math.max(0, Math.min(1, progress))
  const overallIndex = clampedProgress * totalSegments
  const segmentIndex = Math.min(Math.floor(overallIndex), totalSegments - 1)
  const segmentProgress = overallIndex - segmentIndex

  const p1 = points[segmentIndex]
  const p2 = points[Math.min(segmentIndex + 1, points.length - 1)]

  const cx = p1.x + (p2.x - p1.x) * segmentProgress
  const cy = p1.y + (p2.y - p1.y) * segmentProgress

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="signal-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.15"
        initial={false}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="4"
        fill={color}
        style={{ filter: 'drop-shadow(0 0 6px rgba(92,75,255,0.5))' }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="10"
        fill={color}
        fillOpacity="0.1"
      />
    </svg>
  )
}
