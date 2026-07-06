import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}
