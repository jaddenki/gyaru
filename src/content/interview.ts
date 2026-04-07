// interview — re-exports from newsvan location file

export interface DialogueLine {
  speaker: 'reporter' | 'ganguro' | 'note'
  position: 'left' | 'right' | 'center'
  text: string
}

export interface DialogueCharacter {
  id: string
  label: string
  position: { bottom: string; left?: string; right?: string }
}

export { dialogue as interviewDialogue, characters as dialogueCharacters } from './newsvan'

export const bubblePositions: Record<string, Record<string, string>> = {
  left:   { left: '10%', bottom: '30%' },
  right:  { right: '10%', bottom: '30%' },
  center: { left: '50%', transform: 'translateX(-50%)', bottom: '50%', fontStyle: 'italic' },
}
