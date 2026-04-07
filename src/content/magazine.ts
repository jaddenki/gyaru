// magazine rack — the gyaru bible

import type { ZoneConfig } from './zones'
import type { ModalContentEntry } from './modals'

export const zone: ZoneConfig = {
  id: 'zone-magazine',
  modal: 'modal-magazine',
  label: 'Magazine Rack',
  interaction: 'modal',
  rect: { top: '10%', left: '30%', width: '20%', height: '30%' },
}

export const modal: ModalContentEntry = {
  title: 'egg magazine',
  subtitle: 'the gyaru bible',
  body: '[placeholder]',
  timeline: [
    { year: '1995', event: 'egg magazine launches' },
    { year: '1996', event: 'kogyaru peaks' },
    { year: '1999', event: 'ganguro era begins' },
    { year: '2000s', event: 'manba emerges' },
    { year: '2014', event: 'egg shuts down' },
    { year: '2019', event: 'egg returns' },
  ],
}
