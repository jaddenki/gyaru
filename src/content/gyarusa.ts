// gyarusa hangout — it takes a circle

import type { ZoneConfig } from './zones'
import type { ModalContentEntry } from './modals'

export const zone: ZoneConfig = {
  id: 'zone-gyarusa',
  modal: 'modal-gyarusa',
  label: 'Gyarusa Hangout',
  interaction: 'modal',
  rect: { top: '10%', left: '80%', width: '18%', height: '30%' },
}

export const modal: ModalContentEntry = {
  title: 'the gyarusa',
  subtitle: 'it takes a circle',
  body: '[placeholder]',
  tags: ['friendship structure', 'purikura sessions', 'para para dancing'],
}
