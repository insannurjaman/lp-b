import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Container from './Container'
import HeroJourneyIllustration from './HeroJourneyIllustration'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: reduceMotion ? 0 : 0.1 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  }

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative bg-page pt-32 pb-20 sm:pt-36 md:pt-44 md:pb-28">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={item}>
            <span className="inline-flex items-center rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-secondary shadow-card">
              AI Customer Conversation Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-6 max-w-[900px] font-heading text-[clamp(46px,5.8vw,78px)] font-medium leading-[1.0] tracking-[-0.02em] text-ink text-balance"
          >
            Turn every conversation into a customer journey.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={item}
            className="mt-6 max-w-[680px] text-[17px] leading-relaxed text-ink-secondary text-pretty md:text-[18px]"
          >
            Base360 unifies comments, messages, calls, leads, and campaigns — then uses AI agents to move every customer toward the next best action.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#contact"
              onClick={handleNavClick('#contact')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[15px] font-medium text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-float"
            >
              Request early access
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              onClick={handleNavClick('#how-it-works')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:border-line-strong hover:bg-surface-2"
            >
              <Play className="h-3.5 w-3.5 text-primary" />
              See how it works
            </a>
          </motion.div>

          {/* Supporting line */}
          <motion.p variants={item} className="mt-5 text-[13px] text-ink-muted">
            One system for every conversation.
          </motion.p>
        </motion.div>
      </Container>

      {/* Hero product illustration */}
      <HeroJourneyIllustration />
    </section>
  )
}
