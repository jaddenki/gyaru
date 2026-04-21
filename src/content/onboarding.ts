// onboarding — substyles and base character options

export interface Substyle {
  id: string
  label: string
  emoji: string
  description: string
}

export const substyles: Substyle[] = [
  { id: 'kogyaru', label: 'kogyaru', emoji: '🎀', description: '[placeholder]' },
  { id: 'ganguro', label: 'ganguro', emoji: '🌺', description: '[placeholder]' },
  { id: 'hime', label: 'hime gyaru', emoji: '👑', description: '[placeholder]' },
  { id: 'manba', label: 'manba', emoji: '⚡', description: '[placeholder]' },
  { id: 'onee', label: 'onee gyaru', emoji: '💅', description: '[placeholder]' },
  { id: 'gyaruo', label: 'gyaru-o', emoji: '🕶️', description: '[placeholder]' },
]

export const baseCharacters = [
  { id: 'A', label: 'Base A' },
  { id: 'B', label: 'Base B' },
  { id: 'C', label: 'Base C' },
]
