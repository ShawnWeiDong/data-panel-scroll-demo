import type { AccordionGroup, TileItem } from '../types'

const makeTiles = (prefix: string, count: number): TileItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    label: `${prefix} ${i + 1}`,
    type: prefix,
  }))

export const mockGroups: AccordionGroup[] = [
  {
    id: 'object-def',
    groupLabel: 'OBJECT DEFINITION',
    items: [
      { id: 'bom', label: 'Bill of Materials', count: 18, tiles: makeTiles('Component', 18) },
      { id: 'props', label: 'Properties', count: 12, tiles: makeTiles('Property', 12) },
      { id: 'history', label: 'History', count: 8, tiles: makeTiles('Revision', 8) },
    ],
  },
  {
    id: 'project-data',
    groupLabel: 'OTHER CONNECTED PROJECT DATA',
    items: [
      { id: 'drawings', label: 'Drawings', count: 10, tiles: makeTiles('Drawing', 10) },
      { id: 'uses', label: 'Uses', count: 14, tiles: makeTiles('Use', 14) },
      { id: 'used-in', label: 'Used In', count: 6, tiles: makeTiles('Assembly', 6) },
    ],
  },
  {
    id: 'process',
    groupLabel: 'PROCESS DATA',
    items: [
      { id: 'change-orders', label: 'Change Orders', count: 9, tiles: makeTiles('Order', 9) },
      { id: 'tasks', label: 'Tasks', count: 5, tiles: makeTiles('Task', 5) },
    ],
  },
  {
    id: 'operations',
    groupLabel: 'OPERATIONS DATA',
    items: [
      { id: 'production', label: 'Production Plan', count: 7, tiles: makeTiles('Plan', 7) },
      { id: 'schedule', label: 'Schedule', count: 4, tiles: makeTiles('Schedule', 4) },
    ],
  },
]

export const filterOptions = [
  'All Connected Data Types',
  'Object Definition',
  'Project Data',
  'Process Data',
  'Operations Data',
]
