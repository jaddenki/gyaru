// beauty standard — what gyaru was rejecting

import type { ZoneConfig } from './zones'
import type { ModalContentEntry } from './modals'

export const zone: ZoneConfig = {
  id: 'zone-standard',
  modal: 'modal-standard',
  label: 'Department Store Window',
  interaction: 'modal',
  rect: { top: '10%', left: '42%', width: '10%', height: '30%' },
}

export const modal: ModalContentEntry = {
  title: 'the ideal',
  subtitle: 'what you were supposed to look like',
  body: `[placeholder]`,
  tags: ['pale skin', 'dark hair', 'quiet', 'demure', 'yamato nadeshiko', 'OL look'],
}
