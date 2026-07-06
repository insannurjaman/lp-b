import Container from './Container'
import EmailCaptureForm from './EmailCaptureForm'

export default function FinalCTA() {
  return (
    <section id="cta" className="bg-base-950 py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-dark-mode-text text-balance">
            Your next customer may have already commented.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-dark-mode-secondary">
            Stop losing leads between tools. Bring every conversation, AI agent,
            contact and campaign into Base360.
          </p>
          <div className="mt-8 flex justify-center">
            <EmailCaptureForm />
          </div>
          <p className="mt-4 text-sm text-dark-mode-secondary/50">
            One system for every conversation.
          </p>
        </div>
      </Container>
    </section>
  )
}
