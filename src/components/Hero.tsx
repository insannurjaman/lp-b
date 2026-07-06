import { ArrowRight, ChevronDown } from 'lucide-react'
import Container from './Container'
import HeroWorkflow from './HeroWorkflow'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-base-950"
    >
      {/* Subtle hero atmosphere */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] opacity-[0.08]"
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full bg-primary blur-[120px]" />
      </div>
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] opacity-[0.05]"
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full bg-primary blur-[100px]" />
      </div>

      <Container className="relative z-10 flex min-h-screen flex-col justify-center pt-24 pb-16 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="max-w-[640px]">
            <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              The AI operating system for B2C brands
            </p>
            <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-dark-mode-text text-balance">
              From comment to customer.
              <br />
              <span className="text-primary">Automatically.</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-dark-mode-secondary md:text-xl">
              Base360 brings every comment, DM, WhatsApp message, SMS, email and
              call into one system — then uses AI agents to reply, qualify,
              follow up and move every lead forward.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector('#cta')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shadow-lg shadow-primary/25"
              >
                Request early access
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#journey"
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector('#journey')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-dark-mode-text transition-all duration-200 hover:bg-white/5"
              >
                See the journey
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-6 text-sm text-dark-mode-secondary/70">
              Every conversation. Every channel. Every lead. One system.
            </p>
          </div>

          {/* Workflow visualization */}
          <div className="flex justify-center lg:justify-end">
            <HeroWorkflow />
          </div>
        </div>
      </Container>
    </section>
  )
}
