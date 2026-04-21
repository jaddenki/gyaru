// zones — assembled from individual location files

export interface ZoneRect {
  top: string
  left: string
  width: string
  height: string
}

export interface ZoneNudge {
  /** Horizontal offset (CSS length), e.g. `2%`, `8px`. Positive ≈ right. */
  x?: string
  /** Vertical offset (CSS length), e.g. `-1%`, `4px`. Positive ≈ down. */
  y?: string
}

export interface ZoneConfig {
  id: string
  label: string
  interaction: 'modal' | 'dialogue' | 'gallery' | 'tooltip' | 'magazine'
  modal?: string
  rect: ZoneRect
  /** Fine-tune this hotspot vs the bg without changing `rect` (applied as `translate`). */
  nudge?: ZoneNudge
}

import { zone as shibuya109 } from './shibuya109'
import { zone as magazine } from './magazine'
import { zone as newsvan } from './newsvan'
import { zone as gyarusa } from './gyarusa'

export const zones: ZoneConfig[] = [
  shibuya109,
  magazine,
  newsvan,
  gyarusa,
]
