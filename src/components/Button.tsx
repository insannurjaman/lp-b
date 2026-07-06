import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer'

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20',
    secondary:
      'border border-white/15 text-dark-mode-text hover:bg-white/5',
    ghost:
      'text-dark-mode-secondary hover:text-dark-mode-text',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
