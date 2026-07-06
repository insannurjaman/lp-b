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
  { label: 'Contact', href: '#contact' },
]

/* ───────────────── Hero journey illustration ───────────────── */

export interface WorkflowNodeData {
  id: string
  label: string
  icon: ComponentType<LucideProps>
  side: 'left' | 'right'
}

export const heroWorkflowNodes: WorkflowNodeData[] = [
  { id: 'reply', label: 'AI reply', icon: Send, side: 'left' },
  { id: 'dm', label: 'Private DM', icon: MessageCircle, side: 'left' },
  { id: 'qualify', label: 'Qualify', icon: Zap, side: 'left' },
  { id: 'crm', label: 'CRM lead', icon: User, side: 'right' },
  { id: 'call', label: 'AI call', icon: PhoneCall, side: 'right' },
  { id: 'campaign', label: 'Campaign', icon: Mail, side: 'right' },
]

/* ───────────────── Product proof journey ───────────────── */

export interface JourneyStep {
  number: string
  title: string
  description: string
  icon: ComponentType<LucideProps>
}

export const journeySteps: JourneyStep[] = [
  { number: '01', title: 'Comment received', description: 'TikTok comment enters the unified inbox', icon: MessageCircle },
  { number: '02', title: 'Public reply sent', description: 'AI responds in-thread, preserves context', icon: Send },
  { number: '03', title: 'Private conversation', description: 'DM opened — questions answered', icon: MessageCircle },
  { number: '04', title: 'Buying intent identified', description: 'AI detects interest and qualifies the lead', icon: Zap },
  { number: '05', title: 'CRM lead created', description: 'Contact record with full conversation history', icon: User },
  { number: '06', title: 'AI call completed', description: 'Voice follow-up — next step confirmed', icon: PhoneCall },
  { number: '07', title: 'Nurture campaign', description: 'Added to the right marketing sequence', icon: Mail },
  { number: '08', title: 'Customer converted', description: 'Opportunity closed — journey complete', icon: CheckCircle2 },
]

export const proofBenefits = [
  'No missed comments',
  'One customer history',
  'Automatic qualification',
  'Continuous follow-up',
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

/* ───────────────── Automation journey ───────────────── */

export interface AutomationStage {
  id: string
  label: string
  icon: ComponentType<LucideProps>
}

export const automationStages: AutomationStage[] = [
  { id: 'comment', label: 'Comment', icon: MessageCircle },
  { id: 'reply', label: 'Reply', icon: Send },
  { id: 'dm', label: 'DM', icon: MessageCircle },
  { id: 'qualify', label: 'Qualify', icon: Zap },
  { id: 'crm', label: 'CRM', icon: User },
  { id: 'call', label: 'Call', icon: PhoneCall },
  { id: 'campaign', label: 'Campaign', icon: Mail },
  { id: 'customer', label: 'Customer', icon: CheckCircle2 },
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
