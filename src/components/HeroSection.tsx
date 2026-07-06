import Container from './Container'
import ConversationEngine from './ConversationEngine'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-cream pt-24 pb-20 md:pt-32 md:pb-28">
      <Container>
        <div className="mx-auto max-w-[900px]">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-primary">
            Base360 — The conversation engine
          </p>
          <h1 className="font-heading text-[clamp(2.8rem,8vw,7.25rem)] font-medium leading-[0.92] tracking-tight text-dark-text text-balance">
            Turn every
            <br />
            conversation into
            <br />
            forward motion.
          </h1>
          <p className="mt-6 max-w-[580px] text-lg leading-relaxed text-muted md:text-xl">
            Base360 connects every comment, message, call, lead, and campaign — then uses AI agents to move each customer toward the next best action.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#closing"
              onClick={(e) => {
                e.preventDefault()
                const target = document.querySelector('#closing')
                if (target) target.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-dark-text px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-dark-text/90"
            >
              Request early access
            </a>
            <a
              href="#actions"
              onClick={(e) => {
                e.preventDefault()
                const target = document.querySelector('#actions')
                if (target) target.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3.5 text-sm font-medium text-dark-text transition-all hover:bg-dark-text/5"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Product stage - extends beyond container */}
        <div className="relative mt-16 -mx-6 md:-mx-10 lg:-mx-16">
          <ConversationEngine />
        </div>
      </Container>
    </section>
  )
}
