// magazine rack — the gyaru bible

import type { ZoneConfig } from './zones'

/** Shown under the cover image in the magazine pickup overlay */
export const magazineCoverCaption = 'you picked up an egg magazine'
import type { ModalContentEntry } from './modals'

export const zone: ZoneConfig = {
  id: 'zone-magazine',
  label: 'Magazine Rack',
  interaction: 'magazine',
  rect: { top: '69.6%', left: '87.5%', width: '5%', height: '7%' },
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
