import { motion } from 'framer-motion'
import { MessageCircle, Unplug, Waypoints } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'

export default function ProblemSection() {
  return (
    <section className="bg-base-950 py-28 md:py-36">
      <Container>
        <SectionHeading
          light
          title="Your customers move between channels. Their context shouldn't get lost."
          subtitle="A question starts in a social comment, continues in a DM, moves to WhatsApp and ends on a call. Base360 connects every step, so your team and AI always know what happened and what should happen next."
        />
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Before: Disconnected */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.12em] text-warning">
              Before Base360
            </p>
            <div className="space-y-3">
              {[
                { icon: MessageCircle, label: 'TikTok comment', tool: 'Social dashboard' },
                { icon: MessageCircle, label: 'Instagram DM', tool: 'Instagram app' },
                { icon: MessageCircle, label: 'WhatsApp message', tool: 'WhatsApp Business' },
                { icon: MessageCircle, label: 'Phone call', tool: 'Phone system' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                      <Icon className="h-4 w-4 text-warning" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dark-mode-secondary">
                        {item.label}
                      </p>
                      <p className="text-xs text-dark-mode-secondary/50">
                        in {item.tool}
                      </p>
                    </div>
                    <Unplug className="h-4 w-4 shrink-0 text-warning/50" aria-hidden="true" />
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* After: Unified */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.12em] text-success">
              With Base360
            </p>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                  <Waypoints className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-mode-text">Unified customer profile</p>
                  <p className="text-xs text-dark-mode-secondary/60">All channels · Full context</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  'TikTok comment → replied publicly',
                  'Instagram DM → answered privately',
                  'WhatsApp → shared pricing',
                  'AI call → qualified lead',
                  'CRM → lead created with full history',
                  'Marketing → nurture sequence',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    <span className="text-dark-mode-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
