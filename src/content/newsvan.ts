// news van — the interview scene

import type { ZoneConfig } from './zones'
import type { DialogueLine, DialogueCharacter } from './interview'

export const zone: ZoneConfig = {
  id: 'zone-interview',
  label: 'News Van',
  interaction: 'dialogue',
  rect: { top: '10%', left: '55%', width: '20%', height: '30%' },
}

export const characters: DialogueCharacter[] = [
  { id: 'reporter', label: 'REPORTER', position: { bottom: '10%', left: '10%' } },
  { id: 'ganguro', label: 'GANGURO GIRL', position: { bottom: '10%', right: '10%' } },
]

export const dialogue: DialogueLine[] = [
  {
    speaker: 'reporter',
    position: 'left',
    text: "don't you think you look frightening?",
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "frightening? good. that's kind of the point.",
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "my whole life i was told to be pale, quiet, small. this is the opposite of that. deliberately. all the way.",
  },
  {
    speaker: 'reporter',
    position: 'left',
    text: "some people say you're trying to look like someone you're not — like another race entirely.",
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "...that one's more complicated. i don't have a clean answer for that.",
  },
  {
    speaker: 'note',
    position: 'center',
    text: "the conversation around ganguro and race has never been fully resolved. intent and impact are not always the same thing.",
  },
]
