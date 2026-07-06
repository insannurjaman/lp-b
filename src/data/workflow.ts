export interface WorkflowStep {
  id: string
  action: string
  label: string
  description: string
}

export const workflowSteps: WorkflowStep[] = [
  { id: 'capture', action: 'CAPTURE', label: 'Comment captured', description: 'TikTok comment enters the inbox' },
  { id: 'reply', action: 'RESPOND', label: 'Public reply sent', description: 'AI replies in-thread, moves to DM' },
  { id: 'dm', action: 'UNDERSTAND', label: 'Private conversation', description: 'AI qualifies interest via DM' },
  { id: 'qualify', action: 'QUALIFY', label: 'Intent confirmed', description: 'High buying intent detected' },
  { id: 'crm', action: 'FOLLOW UP', label: 'CRM lead created', description: 'Contact record with full context' },
  { id: 'call', action: 'CONVERT', label: 'AI call completed', description: 'Follow-up call — next step set' },
  { id: 'campaign', action: 'NURTURE', label: 'Campaign started', description: 'Added to nurture sequence' },
  { id: 'won', action: 'CONVERTED', label: 'Customer won', description: 'Opportunity closed' },
]
