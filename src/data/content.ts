import type { ComponentType } from 'react'
import {
  MessageCircle, Send, Users, Zap, PhoneCall, Mail,
  User, TrendingUp, CheckCircle2,
  type LucideProps,
} from 'lucide-react'

/* ───────────────── Navigation ───────────────── */

export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Product', href: '#capabilities' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Platform', href: '#platform' },
  { label: 'Orchestration', href: '#orchestration' },
  { label: 'Contact', href: '#contact' },
]

/* ───────────────── Hero journey ───────────────── */

export interface HeroJourneyStep {
  step: number
  label: string
  customerAction: string
  base360Action: string
  recordUpdate: string
}

export const heroJourneySteps: HeroJourneyStep[] = [
  { step: 1, label: 'Comment received', customerAction: 'How much is this?', base360Action: 'Incoming signal detected from TikTok', recordUpdate: 'Identity: Alex Chen · Source: TikTok' },
  { step: 2, label: 'Public reply', customerAction: 'Awaiting response', base360Action: 'Reply generated and sent in-thread', recordUpdate: 'Activity: Public reply sent' },
  { step: 3, label: 'Private DM', customerAction: 'Continued in DM', base360Action: 'DM thread opened · context carried over', recordUpdate: 'Channels: TikTok → TikTok, Instagram' },
  { step: 4, label: 'Questions answered', customerAction: 'Interested in Pro plan', base360Action: 'Product info sent · conversation summarized', recordUpdate: 'Interest: Pro plan extracted' },
  { step: 5, label: 'Intent qualified', customerAction: 'High buying intent', base360Action: 'Intent analysis complete · lead scored', recordUpdate: 'Intent: Unknown → High · Score: 92' },
  { step: 6, label: 'CRM record created', customerAction: 'Lead record active', base360Action: 'Contact created · full history attached', recordUpdate: 'Lead stage: New → Qualified · Owner: AI Agent' },
  { step: 7, label: 'AI call', customerAction: 'Demo confirmed', base360Action: 'Voice call completed · demo scheduled', recordUpdate: 'Next action: Demo Thu 2pm · Voice channel added' },
  { step: 8, label: 'Campaign activated', customerAction: 'Nurture sequence started', base360Action: 'Added to Summer Launch campaign', recordUpdate: 'Campaign: None → Summer 2026 · Email added' },
  { step: 9, label: 'Customer won', customerAction: 'Signed up', base360Action: 'Opportunity closed · revenue booked', recordUpdate: 'Lead stage: Customer · Outcome: Won' },
]

export interface HeroOrbitNode {
  id: string
  label: string
  icon: ComponentType<LucideProps>
  side: 'left' | 'right'
}

export const heroOrbitNodes: HeroOrbitNode[] = [
  { id: 'reply', label: 'Public reply', icon: Send, side: 'left' },
  { id: 'dm', label: 'Private DM', icon: MessageCircle, side: 'left' },
  { id: 'answers', label: 'Questions answered', icon: MessageCircle, side: 'left' },
  { id: 'qualify', label: 'Intent qualified', icon: Zap, side: 'left' },
  { id: 'crm', label: 'CRM created', icon: User, side: 'right' },
  { id: 'call', label: 'AI call', icon: PhoneCall, side: 'right' },
  { id: 'campaign', label: 'Campaign activated', icon: Mail, side: 'right' },
]

/* ───────────────── Product proof journey ───────────────── */

export interface JourneyStep {
  number: string
  title: string
  description: string
  icon: ComponentType<LucideProps>
}

export const journeySteps: JourneyStep[] = [
  { number: '01', title: 'Comment', description: 'TikTok comment enters the inbox', icon: MessageCircle },
  { number: '02', title: 'Reply', description: 'AI responds in-thread instantly', icon: Send },
  { number: '03', title: 'DM', description: 'Private conversation with context carried', icon: MessageCircle },
  { number: '04', title: 'Qualify', description: 'Intent detected, lead scored', icon: Zap },
  { number: '05', title: 'CRM', description: 'Customer record with full history', icon: User },
  { number: '06', title: 'Call', description: 'AI voice follow-up confirms next step', icon: PhoneCall },
  { number: '07', title: 'Nurture', description: 'Added to the right campaign sequence', icon: Mail },
  { number: '08', title: 'Customer', description: 'Opportunity closed — journey complete', icon: CheckCircle2 },
]

export const proofBenefits = [
  'No missed comments',
  'One customer history',
  'Automatic qualification',
  'Continuous follow-up',
]

/* ───────────────── Customer history ───────────────── */

export interface HistoryEvent {
  id: string
  channel: string
  action: string
  detail: string
  time: string
  icon: ComponentType<LucideProps>
}

export const customerHistoryEvents: HistoryEvent[] = [
  { id: 'h1', channel: 'TikTok', action: 'Comment received', detail: '"How much is this?"', time: '0m', icon: MessageCircle },
  { id: 'h2', channel: 'TikTok', action: 'Public reply sent', detail: 'Pricing shared in-thread', time: '1m', icon: Send },
  { id: 'h3', channel: 'Instagram', action: 'DM conversation opened', detail: 'Context carried from comment', time: '3m', icon: MessageCircle },
  { id: 'h4', channel: 'System', action: 'Buying intent qualified', detail: 'Interest: Pro plan · Score: 92', time: '5m', icon: Zap },
  { id: 'h5', channel: 'CRM', action: 'Customer record created', detail: 'Full history attached · Lead: Qualified', time: '6m', icon: User },
  { id: 'h6', channel: 'Phone', action: 'AI voice call completed', detail: 'Demo confirmed for Thursday', time: '12m', icon: PhoneCall },
  { id: 'h7', channel: 'Email', action: 'Campaign message sent', detail: 'Welcome sequence · Summer Launch', time: '1h', icon: Mail },
  { id: 'h8', channel: 'System', action: 'Customer converted', detail: 'Opportunity closed · Won', time: '2d', icon: CheckCircle2 },
]

/* ───────────────── Workspace ───────────────── */

export interface Conversation {
  id: string
  channel: string
  channelShort: string
  person: string
  preview: string
  time: string
  unread: boolean
  priority: 'high' | 'normal'
  icon: ComponentType<LucideProps>
}

export const conversations: Conversation[] = [
  { id: 'c1', channel: 'TikTok Comment', channelShort: 'TikTok', person: 'Alex Chen', preview: 'How much is this?', time: '2m', unread: true, priority: 'high', icon: MessageCircle },
  { id: 'c2', channel: 'Instagram DM', channelShort: 'IG', person: 'Sam Rivera', preview: 'Is this still available?', time: '8m', unread: true, priority: 'normal', icon: MessageCircle },
  { id: 'c3', channel: 'WhatsApp', channelShort: 'WA', person: 'Jordan Lee', preview: 'Thanks for the info!', time: '23m', unread: false, priority: 'normal', icon: MessageCircle },
  { id: 'c4', channel: 'Email', channelShort: 'Email', person: 'Priya Sharma', preview: 'Looking forward to the demo', time: '1h', unread: false, priority: 'normal', icon: Mail },
  { id: 'c5', channel: 'SMS', channelShort: 'SMS', person: '+1 (555) 234-5678', preview: 'Can you call me?', time: '2h', unread: false, priority: 'normal', icon: MessageCircle },
  { id: 'c6', channel: 'Voice', channelShort: 'Voice', person: 'Morgan Diaz', preview: 'Voicemail — callback requested', time: '4h', unread: false, priority: 'normal', icon: PhoneCall },
]

export interface CustomerField {
  label: string
  value: string
  accent?: 'violet' | 'success' | 'default'
}

export const customerFields: CustomerField[] = [
  { label: 'Lead stage', value: 'Qualified', accent: 'violet' },
  { label: 'Intent', value: 'High', accent: 'success' },
  { label: 'Lead score', value: '92', accent: 'violet' },
  { label: 'Owner', value: 'AI Agent' },
  { label: 'Source', value: 'TikTok → Instagram' },
  { label: 'Campaign', value: 'Summer Launch 2026' },
]

export interface ActivityEvent {
  id: string
  action: string
  time: string
  done: boolean
  icon: ComponentType<LucideProps>
}

export const activityEvents: ActivityEvent[] = [
  { id: 'a1', action: 'Lead created from TikTok comment', time: '2m ago', done: true, icon: User },
  { id: 'a2', action: 'AI qualified — High intent', time: '1m ago', done: true, icon: Zap },
  { id: 'a3', action: 'AI call scheduled for tomorrow', time: 'now', done: false, icon: PhoneCall },
  { id: 'a4', action: 'Nurture campaign activated', time: '—', done: false, icon: Mail },
]

export const workspaceNav = ['Inbox', 'Contacts', 'Opportunities', 'AI agents', 'Campaigns']

export const workspaceAnnotations = [
  'Every channel in one inbox',
  'AI understands and acts',
  'Complete customer context',
]

/* ───────────────── Benefits ───────────────── */

export interface Benefit {
  icon: ComponentType<LucideProps>
  title: string
  description: string
}

export const benefits: Benefit[] = [
  { icon: MessageCircle, title: 'Never miss a conversation', description: 'Bring every customer message into one queue — across every channel.' },
  { icon: Zap, title: 'Respond faster', description: 'AI agents handle repetitive work and escalate when human judgment is needed.' },
  { icon: Users, title: 'Keep full context', description: 'Every message, call, status, and campaign belongs to one customer history.' },
  { icon: TrendingUp, title: 'Move leads forward', description: 'Automated next actions prevent opportunities from becoming inactive.' },
]

/* ───────────────── Orchestration chapter ───────────────── */

export interface OrchestrationChannel {
  id: string
  label: string
  icon: ComponentType<LucideProps>
}

export const orchestrationChannels: OrchestrationChannel[] = [
  { id: 'tiktok', label: 'TikTok comment', icon: MessageCircle },
  { id: 'instagram', label: 'Instagram DM', icon: MessageCircle },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'sms', label: 'SMS', icon: MessageCircle },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'voice', label: 'Voice', icon: PhoneCall },
]

export interface OrchestrationAction {
  id: string
  label: string
  icon: ComponentType<LucideProps>
}

export const orchestrationActions: OrchestrationAction[] = [
  { id: 'reply', label: 'Reply', icon: Send },
  { id: 'answer', label: 'Answer', icon: MessageCircle },
  { id: 'qualify', label: 'Qualify', icon: Zap },
  { id: 'create-lead', label: 'Create lead', icon: User },
  { id: 'call', label: 'Call', icon: PhoneCall },
  { id: 'follow-up', label: 'Follow up', icon: Mail },
  { id: 'hand-off', label: 'Hand off', icon: Users },
  { id: 'nurture', label: 'Nurture', icon: TrendingUp },
]

export interface OrchestrationOutcome {
  id: string
  label: string
}

export const orchestrationOutcomes: OrchestrationOutcome[] = [
  { id: 'updated', label: 'Customer updated' },
  { id: 'lead-created', label: 'Lead created' },
  { id: 'call-completed', label: 'Call completed' },
  { id: 'campaign-active', label: 'Campaign active' },
  { id: 'human-assigned', label: 'Human assigned' },
  { id: 'won', label: 'Customer won' },
]

/* ───────────────── Capabilities ───────────────── */

export interface CapabilityChannel {
  name: string
  icon: ComponentType<LucideProps>
}

export const capabilityChannels: CapabilityChannel[] = [
  { name: 'TikTok', icon: MessageCircle },
  { name: 'Instagram', icon: MessageCircle },
  { name: 'WhatsApp', icon: MessageCircle },
  { name: 'SMS', icon: MessageCircle },
  { name: 'Email', icon: Mail },
  { name: 'Voice', icon: PhoneCall },
]

export interface CapabilityInboxItem {
  person: string
  preview: string
  channel: string
  time: string
  unread: boolean
  priority?: 'high' | 'normal'
}

export const capabilityInboxItems: CapabilityInboxItem[] = [
  { person: 'Alex Chen', preview: 'How much is this?', channel: 'TikTok', time: '2m', unread: true, priority: 'high' },
  { person: 'Sam Rivera', preview: 'Is this still available?', channel: 'IG', time: '8m', unread: true },
  { person: 'Jordan Lee', preview: 'Thanks for the info!', channel: 'WA', time: '23m', unread: false },
  { person: 'Priya Sharma', preview: 'Looking forward to the demo', channel: 'Email', time: '1h', unread: false },
]

export interface AgentAction {
  label: string
  done: boolean
  icon: ComponentType<LucideProps>
}

export const agentActions: AgentAction[] = [
  { label: 'Reply generated', done: true, icon: Send },
  { label: 'Intent qualified — High', done: true, icon: Zap },
  { label: 'CRM contact created', done: true, icon: User },
  { label: 'AI call scheduled', done: true, icon: PhoneCall },
  { label: 'Campaign activated', done: false, icon: Mail },
  { label: 'Human handoff ready', done: false, icon: Users },
]

export interface AgentInput {
  label: string
  icon: ComponentType<LucideProps>
}

export const agentInputs: AgentInput[] = [
  { label: 'TikTok comment', icon: MessageCircle },
  { label: 'Instagram DM', icon: MessageCircle },
  { label: 'WhatsApp message', icon: MessageCircle },
]

export interface FollowUpStep {
  label: string
  status: 'done' | 'active' | 'pending'
  time: string
}

export const followUpSteps: FollowUpStep[] = [
  { label: 'Comment reply', status: 'done', time: '0.3s' },
  { label: 'DM follow-up', status: 'done', time: '1.1s' },
  { label: 'Qualification', status: 'done', time: '2.4s' },
  { label: 'AI voice call', status: 'active', time: 'now' },
  { label: 'Email nurture', status: 'pending', time: 'tomorrow' },
  { label: 'Demo scheduled', status: 'pending', time: 'Thu' },
]

export interface CampaignStep {
  name: string
  status: 'sent' | 'ready' | 'scheduled'
  channel: string
}

export const campaignSteps: CampaignStep[] = [
  { name: 'Welcome', status: 'sent', channel: 'Email' },
  { name: 'Features', status: 'sent', channel: 'SMS' },
  { name: 'Case study', status: 'ready', channel: 'Email' },
  { name: 'Demo invite', status: 'scheduled', channel: 'Voice' },
  { name: 'Follow-up', status: 'scheduled', channel: 'Email' },
]

/* ───────────────── Footer ───────────────── */

export interface FooterLinkGroup {
  title: string
  links: NavItem[]
}

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Product', href: '#capabilities' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Platform', href: '#platform' },
      { label: 'Orchestration', href: '#orchestration' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
]
