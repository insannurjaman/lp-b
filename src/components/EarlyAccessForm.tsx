import { useState, useId } from 'react'
import { Check, ArrowRight } from 'lucide-react'

export default function EarlyAccessForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputId = useId()
  const feedbackId = useId()

  function validate(value: string): string {
    if (!value.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address'
    return ''
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate(email)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 px-4 py-3.5"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/15">
          <Check className="h-4 w-4 text-success" />
        </div>
        <div className="text-left">
          <p className="text-[14px] font-medium text-ink">You&apos;re on the list</p>
          <p className="text-[12px] text-ink-secondary">We&apos;ll reach out when Base360 is ready for early access.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor={inputId} className="sr-only">Work email</label>
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
            placeholder="Enter your work email"
            aria-invalid={!!error}
            aria-describedby={error ? feedbackId : undefined}
            className={`w-full rounded-xl border bg-surface px-4 py-3.5 text-[15px] text-ink placeholder-ink-muted transition-all focus:outline-none focus:ring-2 focus:ring-primary/10 ${
              error ? 'border-error focus:border-error' : 'border-line focus:border-primary/50'
            }`}
          />
        </div>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[15px] font-medium text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-float"
        >
          Request early access
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div id={feedbackId} role="alert" aria-live="polite" className="mt-2 min-h-[1.25rem]">
        {error && <p className="text-[13px] text-error">{error}</p>}
      </div>
    </form>
  )
}
