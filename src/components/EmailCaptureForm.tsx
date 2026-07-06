import { useState, useId } from 'react'
import { Check, ArrowRight } from 'lucide-react'

export default function EmailCaptureForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputId = useId()
  const feedbackId = useId()

  function validateEmail(value: string): string {
    if (!value.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address'
    return ''
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="flex items-center gap-4 rounded-2xl border border-success/30 bg-success/10 px-6 py-5"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
          <Check className="h-5 w-5 text-success" aria-hidden="true" />
        </div>
        <div>
          <p className="font-medium text-dark-mode-text">You're on the list</p>
          <p className="text-sm text-dark-mode-secondary">
            We'll be in touch when Base360 is ready for early access.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            placeholder="Enter your work email"
            aria-invalid={!!error}
            aria-describedby={error ? feedbackId : undefined}
            className="w-full rounded-xl border border-white/10 bg-base-900/50 px-4 py-3 text-sm text-dark-mode-text placeholder-dark-mode-secondary/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shadow-lg shadow-primary/20 whitespace-nowrap cursor-pointer"
        >
          Request early access
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div
        id={feedbackId}
        role="alert"
        aria-live="polite"
        className="mt-2 min-h-[1.25rem]"
      >
        {error && (
          <p className="text-sm text-warning">{error}</p>
        )}
      </div>
    </form>
  )
}
