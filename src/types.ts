export type ScrollStrategy = 'panel-scroll' | 'pagination' | 'nested-scroll' | 'drill-down'

export interface TileItem {
  id: string
  label: string
  type: string
}

export interface AccordionItem {
  id: string
  label: string
  count?: number
  tiles: TileItem[]
}

export interface AccordionGroup {
  id: string
  groupLabel: string
  items: AccordionItem[]
}
