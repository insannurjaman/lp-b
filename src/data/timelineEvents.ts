export interface TimelineEvent {
  id: string
  channel: string
  summary: string
  time: string
  type: 'inbound' | 'outbound' | 'system'
}

export interface CustomerProfile {
  name: string
  initials: string
  email: string
  phone: string
  leadStatus: string
  intentLevel: string
  assignedTo: string
  campaign: string
  nextAction: string
  summary: string
}

export const customerProfile: CustomerProfile = {
  name: 'Alex Chen',
  initials: 'AC',
  email: 'alex.chen@example.com',
  phone: '+1 (555) 123-4567',
  leadStatus: 'Qualified',
  intentLevel: 'High',
  assignedTo: 'Sarah Kim',
  campaign: 'Summer Launch 2026',
  nextAction: 'Schedule demo call',
  summary: 'Alex reached out via a TikTok comment asking about pricing. The conversation moved to DM, then WhatsApp. An AI qualification call confirmed budget and timeline.',
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'e1',
    channel: 'TikTok',
    summary: 'Commented: "How much is this?"',
    time: 'Today, 10:23 AM',
    type: 'inbound',
  },
  {
    id: 'e2',
    channel: 'TikTok',
    summary: 'AI replied: "Sent the details to your DMs!"',
    time: 'Today, 10:24 AM',
    type: 'outbound',
  },
  {
    id: 'e3',
    channel: 'Instagram DM',
    summary: 'AI asked: "Which option are you interested in?"',
    time: 'Today, 10:26 AM',
    type: 'outbound',
  },
  {
    id: 'e4',
    channel: 'Instagram DM',
    summary: 'Alex: "The pro plan. Is it still available?"',
    time: 'Today, 10:32 AM',
    type: 'inbound',
  },
  {
    id: 'e5',
    channel: 'WhatsApp',
    summary: 'AI sent pricing comparison and feature list',
    time: 'Today, 10:45 AM',
    type: 'outbound',
  },
  {
    id: 'e6',
    channel: 'System',
    summary: 'Lead qualified — High intent detected',
    time: 'Today, 10:50 AM',
    type: 'system',
  },
  {
    id: 'e7',
    channel: 'AI Voice',
    summary: 'Follow-up call completed — Interested, wants a demo',
    time: 'Today, 11:30 AM',
    type: 'outbound',
  },
  {
    id: 'e8',
    channel: 'Email',
    summary: 'Added to nurture sequence: "Summer Launch 2026"',
    time: 'Today, 11:45 AM',
    type: 'system',
  },
]
