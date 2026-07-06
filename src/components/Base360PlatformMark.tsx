interface Base360PlatformMarkProps {
  className?: string
  size?: number
}

export default function Base360PlatformMark({ className = '', size = 32 }: Base360PlatformMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#6657FF" />
      <rect x="1" y="1" width="30" height="30" rx="9" stroke="#5546F0" strokeOpacity="0.3" />
      <circle cx="16" cy="16" r="8.5" stroke="white" strokeOpacity="0.85" strokeWidth="2" />
      <circle cx="16" cy="7.5" r="2.6" fill="white" />
      <circle cx="16" cy="16" r="2" fill="white" fillOpacity="0.6" />
    </svg>
  )
}
