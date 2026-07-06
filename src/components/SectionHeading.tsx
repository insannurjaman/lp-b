interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.15] tracking-tight text-balance ${
          light ? 'text-dark-mode-text' : 'text-dark-text'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-lg leading-relaxed md:text-xl ${
            light ? 'text-dark-mode-secondary' : 'text-muted-text'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
