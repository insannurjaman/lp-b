export interface ProductPillar {
  id: string
  title: string
  description: string
  features: string[]
}

export const productPillars: ProductPillar[] = [
  {
    id: 'inbox',
    title: 'One unified inbox',
    description: 'Bring social comments, DMs, WhatsApp, SMS, email and calls into one shared workspace.',
    features: [
      'Multi-channel conversation inbox',
      'Channel indicators on every message',
      'Assigned agent per conversation',
      'Unread and priority states',
    ],
  },
  {
    id: 'agents',
    title: 'AI agents that do the work',
    description: 'Reply, answer questions, qualify leads, follow up and handle repetitive conversations.',
    features: [
      'AI task queue with completed actions',
      'Agent activity timeline',
      'Human handoff with full context',
      'Configurable response templates',
    ],
  },
  {
    id: 'crm',
    title: 'A CRM built into every conversation',
    description: 'Automatically turn customer interactions into organized contacts, intent and opportunities.',
    features: [
      'Customer profile with full history',
      'Lead status and buying intent',
      'Assigned owner and next action',
      'Automated contact enrichment',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing and subscribers',
    description: 'Capture subscribers, launch campaigns and nurture contacts from the same customer record.',
    features: [
      'Campaign journey builder',
      'Subscriber status tracking',
      'Multi-step sequence progress',
      'Email and SMS campaign steps',
    ],
  },
]
