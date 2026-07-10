interface Base360PlatformMarkProps {
  className?: string
  size?: number
}

export default function Base360PlatformMark({ className = '', size = 28 }: Base360PlatformMarkProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}base360_icon.png`}
      alt="Base360 logo"
      width={size}
      height={size}
      className={className}
    />
  )
}
