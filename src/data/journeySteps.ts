export interface JourneyStep {
  number: number
  title: string
  description: string
  detail: string
}

export const journeySteps: JourneyStep[] = [
  {
    number: 1,
    title: 'Capture',
    description: 'A customer asks a question through a social comment.',
    detail: 'Base360 monitors every social channel and captures every comment, reply, and mention in real time — routing them into a single conversation workspace.',
  },
  {
    number: 2,
    title: 'Respond',
    description: 'An AI agent replies publicly and continues the conversation privately.',
    detail: 'The AI crafts a contextual public reply, then moves the conversation to a private DM to keep the social thread clean while continuing the interaction.',
  },
  {
    number: 3,
    title: 'Qualify',
    description: 'Questions are answered and buying intent is identified.',
    detail: 'The AI asks qualifying questions, detects buying signals from the customer\'s responses, and scores the lead based on engagement and intent.',
  },
  {
    number: 4,
    title: 'Convert into a lead',
    description: 'The conversation automatically becomes a CRM record with its complete context.',
    detail: 'Every message, response, and intent signal is preserved. A lead record is created with the full conversation history, ready for your team to act on.',
  },
  {
    number: 5,
    title: 'Follow up',
    description: 'AI voice, SMS and email keep the customer moving forward.',
    detail: 'Base360 triggers a multi-channel follow-up sequence — an AI voice call, a personalized SMS, and a summary email — all from the same conversation thread.',
  },
  {
    number: 6,
    title: 'Nurture and close',
    description: 'The contact enters the right marketing journey until they are ready to buy.',
    detail: 'The contact is added to a targeted nurture campaign. Base360 tracks engagement across every touchpoint and alerts your team when the lead is ready to close.',
  },
]
