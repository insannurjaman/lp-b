import { Play, CheckCircle2 } from 'lucide-react'
import Container from './Container'
import EarlyAccessForm from './EarlyAccessForm'
import { OrbitSuccess } from './Orbit'

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
        <div className="relative overflow-hidden rounded-[20px] border border-line bg-surface-2">
          {/* Dotted grid texture */}
          <div className="dotted-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-12 p-8 md:p-14 lg:grid-cols-2 lg:gap-16 lg:p-16">

            {/* Left: headline + form */}
            <div className="flex flex-col justify-center">
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

            {/* Right: successful customer card — orbit endpoint */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[340px]">
                {/* Faint orbit path arriving at success */}
                <svg className="pointer-events-none absolute -left-12 top-1/2 hidden h-24 w-12 -translate-y-1/2 lg:block" viewBox="0 0 48 96" fill="none" aria-hidden="true">
                  <path d="M 2 48 Q 24 20 46 48" stroke="#6657FF" strokeWidth="1.5" fill="none" strokeOpacity="0.3" strokeDasharray="3 4" />
                  <circle cx="2" cy="48" r="3" fill="#6657FF" fillOpacity="0.4" />
                  <circle cx="46" cy="48" r="3" fill="#42B883" />
                </svg>

                <OrbitSuccess
                  person="Alex Chen"
                  initials="AC"
                  score="92"
                  campaign="Summer 2026"
                />

                {/* Outcome summary */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-line bg-surface p-3">
                    <span className="text-[12px] text-ink-muted">Source</span>
                    <p className="text-[13px] font-medium text-ink">TikTok</p>
                  </div>
                  <div className="rounded-lg border border-line bg-surface p-3">
                    <span className="text-[12px] text-ink-muted">Intent</span>
                    <p className="text-[13px] font-semibold text-success">High</p>
                  </div>
                  <div className="rounded-lg border border-line bg-surface p-3">
                    <span className="text-[12px] text-ink-muted">Lead stage</span>
                    <p className="text-[13px] font-semibold text-primary">Customer</p>
                  </div>
                  <div className="rounded-lg border border-line bg-surface p-3">
                    <span className="text-[12px] text-ink-muted">Campaign</span>
                    <p className="text-[13px] font-medium text-ink">Completed</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-lg border border-success/20 bg-success/5 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-[13px] font-medium text-success">Outcome: Won</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
