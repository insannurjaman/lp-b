export interface Capability {
  id: string
  title: string
  description: string
}

export const capabilities: Capability[] = [
  {
    id: 'inbox',
    title: 'Unified inbox',
    description: 'Every channel in one place — social, messaging, email, voice. No switching tabs.',
  },
  {
    id: 'agents',
    title: 'AI agents',
    description: 'Reply, qualify, update records, make calls, launch campaigns — autonomously.',
  },
  {
    id: 'crm',
    title: 'Built-in CRM',
    description: 'Every conversation becomes a contact. Every contact has complete history.',
  },
  {
    id: 'marketing',
    title: 'Marketing & subscribers',
    description: 'Nurture contacts across email and SMS campaigns from the same customer record.',
  },
]
