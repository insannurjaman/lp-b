import { useState, useId } from 'react'
import { Check, ArrowRight } from 'lucide-react'

export default function EmailCaptureForm() {
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
    if (err) { setError(err); return }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-success/20 bg-success/5 px-6 py-5" role="status" aria-live="polite">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/20">
          <Check className="h-5 w-5 text-success" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-dark-mode-text">You&apos;re on the list</p>
          <p className="text-xs text-dark-mode-secondary/60">We&apos;ll be in touch when Base360 is ready for early access.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
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
            className="w-full rounded-xl border border-dark-text/15 bg-white px-4 py-3.5 text-sm text-dark-text placeholder-muted/50 transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-dark-text px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-dark-text/90 cursor-pointer"
        >
          Request early access
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div id={feedbackId} role="alert" aria-live="polite" className="mt-2 min-h-[1.25rem]">
        {error && <p className="text-sm text-primary">{error}</p>}
      </div>
    </form>
  )
}
