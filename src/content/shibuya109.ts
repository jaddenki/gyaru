// shibuya 109 — the gyaru mall

import type { ZoneConfig } from './zones'
import type { ModalContentEntry } from './modals'

export const zone: ZoneConfig = {
  id: 'zone-109',
  modal: 'modal-109',
  label: 'Shibuya 109',
  interaction: 'modal',
  rect: { top: '10%', left: '5%', width: '20%', height: '30%' },
}

export const modal: ModalContentEntry = {
  title: 'shibuya 109',
  subtitle: 'the gyaru mall',
  body: '[placeholder]',
  tags: ['D.I.A.', 'LIZ LISA', 'MA★RS', 'ALBA ROSA'],
}
