// zones — assembled from individual location files

export interface ZoneRect {
  top: string
  left: string
  width: string
  height: string
}

export interface ZoneConfig {
  id: string
  label: string
  interaction: 'modal' | 'dialogue' | 'gallery' | 'tooltip'
  modal?: string
  rect: ZoneRect
}

import { zone as shibuya109 } from './shibuya109'
import { zone as magazine } from './magazine'
import { zone as newsvan } from './newsvan'
import { zone as gyarusa } from './gyarusa'
import { zone as beautystandard } from './beautystandard'

export const zones: ZoneConfig[] = [
  shibuya109,
  magazine,
  beautystandard,
  newsvan,
  gyarusa,
]
