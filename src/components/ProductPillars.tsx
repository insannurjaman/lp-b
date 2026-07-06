import { motion } from 'framer-motion'
import {
  Inbox,
  Bot,
  Users,
  Megaphone,
  Check,
  ArrowRight,
} from 'lucide-react'
import { productPillars } from '../data/productPillars'
import Container from './Container'
import SectionHeading from './SectionHeading'

const pillarIcons = [Inbox, Bot, Users, Megaphone]

const pillarUI = [
  // Inbox
  <div key="inbox-ui" className="space-y-2">
    <div className="flex items-center gap-2 rounded-lg border border-primary/10 bg-primary/5 px-3 py-2">
      <div className="h-2 w-2 rounded-full bg-primary" />
      <span className="flex-1 text-xs text-dark-mode-secondary">TikTok: "How much is this?"</span>
      <span className="text-[10px] text-primary">New</span>
    </div>
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 opacity-70">
      <div className="h-2 w-2 rounded-full bg-warning" />
      <span className="flex-1 text-xs text-dark-mode-secondary/70">Instagram DM: "Interested"</span>
      <span className="text-[10px] text-dark-mode-secondary/40">Unread</span>
    </div>
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 opacity-50">
      <div className="h-2 w-2 rounded-full bg-success" />
      <span className="flex-1 text-xs text-dark-mode-secondary/50">WhatsApp: "Yes, please"</span>
      <span className="text-[10px] text-dark-mode-secondary/30">Done</span>
    </div>
  </div>,

  // AI agents
  <div key="agents-ui" className="space-y-2">
    <div className="rounded-lg border border-success/10 bg-success/5 px-3 py-2">
      <div className="flex items-center gap-2">
        <Check className="h-3 w-3 text-success" aria-hidden="true" />
        <span className="text-xs text-dark-mode-secondary">Replied to TikTok comment</span>
      </div>
    </div>
    <div className="rounded-lg border border-success/10 bg-success/5 px-3 py-2">
      <div className="flex items-center gap-2">
        <Check className="h-3 w-3 text-success" aria-hidden="true" />
        <span className="text-xs text-dark-mode-secondary">Qualified lead — High intent</span>
      </div>
    </div>
    <div className="rounded-lg border border-warning/10 bg-warning/5 px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full border-2 border-warning" />
        <span className="text-xs text-dark-mode-secondary">Handoff to Sarah — Demo needed</span>
      </div>
    </div>
  </div>,

  // CRM
  <div key="crm-ui" className="space-y-2">
    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
        AC
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-dark-mode-text">Alex Chen</p>
        <p className="text-[10px] text-dark-mode-secondary/50">High intent · Qualified</p>
      </div>
    </div>
    <div className="text-xs text-dark-mode-secondary">
      <span className="text-primary">Lead score:</span> 92
    </div>
    <div className="text-xs text-dark-mode-secondary/70">
      Next: Schedule demo call
    </div>
  </div>,

  // Marketing
  <div key="marketing-ui" className="space-y-2">
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="text-xs text-dark-mode-secondary">Welcome email</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full bg-success" />
      <span className="text-xs text-dark-mode-secondary">Product features</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
      <span className="text-xs text-dark-mode-secondary/40">Case study</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
      <span className="text-xs text-dark-mode-secondary/40">Demo invite</span>
    </div>
  </div>,
]

export default function ProductPillars() {
  return (
    <section id="product" className="bg-base-950 py-28 md:py-36">
      <Container>
        <SectionHeading
          light
          eyebrow="Capabilities"
          title="One operating system. Four jobs handled."
          subtitle="Base360 unifies your customer operations across inbox, AI agents, CRM, and marketing — all from one platform."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productPillars.map((pillar, i) => {
            const Icon = pillarIcons[i] || Inbox
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group flex flex-col rounded-2xl border border-white/8 bg-base-900/50 p-5 transition-all duration-300 hover:border-primary/20 hover:bg-base-900/80 hover:shadow-lg hover:shadow-primary/5`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-dark-mode-text">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mb-4 text-xs leading-relaxed text-dark-mode-secondary/70">
                  {pillar.description}
                </p>
                {/* Product UI preview */}
                <div className="mb-4 flex-1 rounded-xl border border-white/5 bg-base-950/50 p-3">
                  {pillarUI[i]}
                </div>
                {/* Features */}
                <ul className="space-y-1.5 border-t border-white/5 pt-3">
                  {pillar.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-dark-mode-secondary/60"
                    >
                      <ArrowRight className="h-3 w-3 shrink-0 text-primary/50" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
