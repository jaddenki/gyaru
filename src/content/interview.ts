// interview — re-exports from newsvan location file

export interface DialogueLine {
  speaker: 'reporter' | 'ganguro' | 'note'
  position: 'left' | 'right' | 'center'
  text: string
  /** Short topic hint for the left rail; set when this beat’s theme starts. */
  tldr?: string
}

export interface DialogueCharacter {
  id: string
  label: string
  /** Optional profile image URL (PNG/WebP/SVG). */
  portrait?: string
  position: { bottom: string; left?: string; right?: string }
}

export {
  dialogue as interviewDialogue,
  characters as dialogueCharacters,
  speakerPortraits,
} from './newsvan'
