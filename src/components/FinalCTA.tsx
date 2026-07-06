import { Play } from 'lucide-react'
import Container from './Container'
import EarlyAccessForm from './EarlyAccessForm'

export default function FinalCTA() {
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="contact" className="bg-page py-20 md:py-28 lg:py-36">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] border border-line bg-surface-2 p-8 md:p-14 lg:p-20">
          {/* Dotted grid texture */}
          <div className="dotted-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

          {/* Faint workflow lines decoration */}
          <svg className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.15]" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <path d="M 380 80 Q 300 120 280 200 Q 260 280 200 320" stroke="#6657FF" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="380" cy="80" r="3" fill="#6657FF" />
            <circle cx="280" cy="200" r="3" fill="#6657FF" />
            <circle cx="200" cy="320" r="3" fill="#6657FF" />
          </svg>

          <div className="relative mx-auto max-w-[640px] text-center">
            <h2 className="font-heading text-[clamp(34px,4.5vw,56px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink text-balance">
              Your next customer may have already commented.
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-ink-secondary text-pretty">
              Base360 makes sure the conversation goes somewhere.
            </p>

            <div className="mt-8">
              <EarlyAccessForm />
            </div>

            <div className="mt-5">
              <a
                href="#how-it-works"
                onClick={handleNavClick('#how-it-works')}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-primary transition-colors hover:text-primary-hover"
              >
                <Play className="h-3.5 w-3.5" />
                Watch the journey
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
