import { motion } from 'framer-motion'
import {
  MessageCircle,
  Music,
  Phone,
  Mail,
  UserCheck,
  Globe,
  Smartphone,
} from 'lucide-react'
import { customerProfile, timelineEvents } from '../data/timelineEvents'
import Container from './Container'
import SectionHeading from './SectionHeading'

const channelIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  TikTok: Music,
  'Instagram DM': MessageCircle,
  WhatsApp: Globe,
  'AI Voice': Phone,
  Email: Mail,
  SMS: Smartphone,
  System: UserCheck,
}

function getChannelColor(type: string) {
  switch (type) {
    case 'inbound':
      return 'text-warning border-warning/30 bg-warning/5'
    case 'outbound':
      return 'text-primary border-primary/30 bg-primary/5'
    case 'system':
      return 'text-success border-success/30 bg-success/5'
    default:
      return 'text-dark-mode-secondary/50 border-white/10 bg-white/5'
  }
}

export default function CustomerTimeline() {
  return (
    <section id="timeline" className="bg-light-bg py-28 md:py-36">
      <Container>
        <SectionHeading
          title="One customer. One connected history."
          subtitle="Your team no longer needs to reconstruct the customer journey across separate tools. Every message, call, status and campaign lives in one timeline."
        />

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          {/* Customer profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-dark-text/8 bg-light-surface p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                {customerProfile.initials}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-text">
                  {customerProfile.name}
                </h3>
                <p className="text-sm text-muted-text">{customerProfile.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-dark-text/5 pb-2">
                <span className="text-xs text-muted-text">Lead status</span>
                <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  {customerProfile.leadStatus}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-dark-text/5 pb-2">
                <span className="text-xs text-muted-text">Intent level</span>
                <span className="rounded-md bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                  {customerProfile.intentLevel}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-dark-text/5 pb-2">
                <span className="text-xs text-muted-text">Assigned to</span>
                <span className="text-xs font-medium text-dark-text">
                  {customerProfile.assignedTo}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-dark-text/5 pb-2">
                <span className="text-xs text-muted-text">Campaign</span>
                <span className="text-xs font-medium text-dark-text">
                  {customerProfile.campaign}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-muted-text">Next action</span>
                <span className="text-xs font-medium text-primary">
                  {customerProfile.nextAction}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-base-950/[0.02] p-3">
              <p className="text-xs leading-relaxed text-muted-text">
                {customerProfile.summary}
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[19px] top-2 bottom-2 w-px bg-dark-text/10"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {timelineEvents.map((event, i) => {
                const Icon = channelIcons[event.channel] || MessageCircle
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 flex shrink-0 items-start pt-1">
                      <div
                        className={`flex h-[38px] w-[38px] items-center justify-center rounded-xl border text-xs ${getChannelColor(event.type)}`}
                      >
                        {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                      </div>
                    </div>
                    {/* Event content */}
                    <div className="flex-1 min-w-0 pt-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-dark-text">
                          {event.channel}
                        </span>
                        <span className="text-[10px] text-muted-text/60">
                          {event.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-text">
                        {event.summary}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
