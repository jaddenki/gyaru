// news van: the interview scene

import type { ZoneConfig } from './zones'
import type { DialogueLine, DialogueCharacter } from './interview'

/** Per-speaker portraits; replace paths with your own assets anytime. */
export const speakerPortraits: Record<DialogueLine['speaker'], string> = {
  reporter: '/assets/dialogue/reporter.png',
  ganguro: '/assets/dialogue/gyaru-group.png',
  note: '/assets/dialogue/narration.svg',
}

export const zone: ZoneConfig = {
  id: 'zone-interview',
  label: 'News Van',
  interaction: 'dialogue',
  rect: { top: '80.2%', left: '83%', width: '8.9%', height: '15.4%' },
}

export const characters: DialogueCharacter[] = [
  {
    id: 'reporter',
    label: 'Reporter',
    portrait: speakerPortraits.reporter,
    position: { bottom: '10%', left: '8%' },
  },
  {
    id: 'ganguro',
    label: 'Ganguro girl',
    portrait: speakerPortraits.ganguro,
    position: { bottom: '10%', right: '8%' },
  },
]
export const dialogue: DialogueLine[] = [
  {
    speaker: 'reporter',
    position: 'left',
    text: "let's be honest: a lot of people here think you look ridiculous. the tan, the hair, the makeup. why?",
    tldr: 'the controversial look',
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "ridiculous to who? people who want me pale and quiet and invisible? i'll take that.",
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "every morning i choose the nails, the lashes, the color. different every time. that's the point.",
  },

  {
    speaker: 'reporter',
    position: 'left',
    text: "most people find it genuinely off-putting. doesn't that bother you?",
    tldr: 'beauty standards',
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "you mean it doesn't look like what you're used to. japanese beauty has one answer: pale, small, quiet. why do i have to do that?",
  },

  {
    speaker: 'reporter',
    position: 'left',
    text: "psychologists say faces feel unsettling when they stray too far from the norm: the tan, the white makeup.",
    tldr: 'deviation from the norm',
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "good. that instinct is what we're poking. if your gut says 'wrong', ask who taught it what 'right' looks like.",
  },

  {
    speaker: 'reporter',
    position: 'left',
    text: "some say the tan and pale face resemble blackface. isn't that harmful?",
    tldr: 'issues about racism',
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "i won't dismiss that. the community hasn't handled it well enough. intent doesn't erase impact. gyaru has to reckon with it, not explain it away.",
  },

  {
    speaker: 'reporter',
    position: 'left',
    text: "media called gyaru delinquent, embarrassing, tied kogyaru to compensated dating.",
    tldr: 'delinquency stereotype',
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "most of us just liked fashion. call a girl deviant and you don't have to take her seriously. people are scared of girls who don't care what they think.",
  },

  {
    speaker: 'reporter',
    position: 'left',
    text: "isn't it ironic? a scene about individuality that still has rules, brands, gatekeeping?",
    tldr: 'rules vs. freedom',
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "that gatekeeping betrays gyaru. the substyles are a starting point, not a cage. the rigid ones police a dying scene.",
  },

  {
    speaker: 'reporter',
    position: 'left',
    text: "after all the controversy, what is gyaru actually about?",
    tldr: 'what gyaru means',
  },
  {
    speaker: 'ganguro',
    position: 'right',
    text: "looking in the mirror and seeing something you chose. ugly is just a word for when they can't control you.",
  },
]
