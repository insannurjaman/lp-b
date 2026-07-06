import Container from './Container'
import EmailCaptureForm from './EmailCaptureForm'

export default function Closing() {
  return (
    <section id="closing" className="relative bg-cream py-36 md:py-48">
      <Container>
        <div className="relative">
          {/* Editorial headline */}
          <div className="mx-auto max-w-[800px]">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              One system. Every conversation.
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.94] tracking-tight text-dark-text text-balance">
              The next customer is already talking.
            </h2>
            <p className="mt-5 max-w-[540px] text-lg leading-relaxed text-muted">
              Base360 makes sure the conversation goes somewhere. Every comment, message, and call — turned into forward motion.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 max-w-[560px]">
            <EmailCaptureForm />
          </div>

          {/* Conversation thread closure visual */}
          <div className="mt-16 flex items-center gap-3 text-xs text-muted/50" aria-hidden="true">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span>Comment</span>
            </div>
            <span className="text-muted/20">→</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span>Reply</span>
            </div>
            <span className="text-muted/20">→</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span>DM</span>
            </div>
            <span className="text-muted/20">→</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span>Qualify</span>
            </div>
            <span className="text-muted/20">→</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span>CRM</span>
            </div>
            <span className="text-muted/20">→</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span>Call</span>
            </div>
            <span className="text-muted/20">→</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span>Campaign</span>
            </div>
            <span className="text-muted/20">→</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-success/70">Customer</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
