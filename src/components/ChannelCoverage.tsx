import {
  Music,
  Camera,
  Globe,
  MessageCircle,
  MessageSquare,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react'
import { channels } from '../data/channels'
import Container from './Container'
import SectionHeading from './SectionHeading'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  music: Music,
  camera: Camera,
  facebook: Globe,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  mail: Mail,
  phone: Phone,
}

export default function ChannelCoverage() {
  return (
    <section id="channels" className="bg-light-bg py-28 md:py-36">
      <Container>
        <SectionHeading
          title="Every channel. One customer history."
          subtitle="Base360 connects every channel your customers use — so their context travels with them."
        />
        <div className="mt-16">
          <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-4">
            {channels.map((channel) => {
              const Icon = iconMap[channel.icon] || MessageCircle
              return (
                <div
                  key={channel.name}
                  className="flex items-center gap-3 rounded-2xl border border-dark-text/8 bg-light-surface px-5 py-3.5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-dark-text">
                    {channel.name}
                  </span>
                </div>
              )
            })}
          </div>
          {/* Visual flow arrow */}
          <div className="mt-12 flex items-center justify-center gap-3 text-sm text-muted-text">
            <span>All channels</span>
            <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-medium text-primary">One Base360 inbox</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
