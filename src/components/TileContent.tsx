import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MuiTypography from '@mui/material/Typography'
import HorizontalTile from './HorizontalTile'
import type { TileItem, ScrollStrategy } from '../types'

const ITEMS_PER_PAGE = 5

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
)
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
)

interface TileContentProps {
  tiles: TileItem[]
  strategy: ScrollStrategy
  fillHeight?: number // dynamic height from parent measurement
}

// Strategy 1: simple column — outer panel scrolls
function SimpleTileGrid({ tiles }: { tiles: TileItem[] }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1.5 }}>
      {tiles.map((tile) => (
        <HorizontalTile key={tile.id} item={tile} />
      ))}
    </Box>
  )
}

// Strategy 2: paginated — tile area fills panel height, outer panel scrolls below
function PaginatedTileGrid({ tiles, fillHeight }: { tiles: TileItem[]; fillHeight: number }) {
  const [page, setPage] = useState(0)
  // how many tiles fit given the height (each tile ~40px + 8px gap)
  const tileRowHeight = 48
  const paginationBarHeight = 40
  const paddingHeight = 24 // p: 1.5 top + bottom
  const availableForTiles = fillHeight - paginationBarHeight - paddingHeight
  const itemsPerPage = Math.max(1, Math.floor(availableForTiles / tileRowHeight))

  const pageCount = Math.ceil(tiles.length / itemsPerPage)
  const safePage = Math.min(page, Math.max(0, pageCount - 1))
  const visible = tiles.slice(safePage * itemsPerPage, (safePage + 1) * itemsPerPage)

  return (
    <Box sx={{ height: fillHeight, display: 'flex', flexDirection: 'column' }}>
      {/* Tile list area */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 1.5,
          overflow: 'hidden',
        }}
      >
        {visible.map((tile) => (
          <HorizontalTile key={tile.id} item={tile} />
        ))}
      </Box>

      {/* Pagination bar */}
      <Box
        sx={{
          height: paginationBarHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <IconButton size="small" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={safePage === 0}>
          <ChevronLeft />
        </IconButton>
        <MuiTypography variant="caption" sx={{ minWidth: 52, textAlign: 'center' }}>
          {safePage + 1} / {pageCount}
        </MuiTypography>
        <IconButton size="small" onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))} disabled={safePage >= pageCount - 1}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  )
}

// Strategy 3: inner scroll fills panel height — cursor inside scrolls inner, outside scrolls panel
function NestedScrollTileGrid({ tiles, fillHeight }: { tiles: TileItem[]; fillHeight: number }) {
  return (
    <Box
      sx={{
        height: fillHeight,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        p: 1.5,
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 2 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {tiles.map((tile) => (
          <HorizontalTile key={tile.id} item={tile} />
        ))}
      </Box>
    </Box>
  )
}

export default function TileContent({ tiles, strategy, fillHeight }: TileContentProps) {
  if (strategy === 'pagination') {
    return <PaginatedTileGrid tiles={tiles} fillHeight={fillHeight ?? 240} />
  }
  if (strategy === 'nested-scroll') {
    return <NestedScrollTileGrid tiles={tiles} fillHeight={fillHeight ?? 240} />
  }
  return <SimpleTileGrid tiles={tiles} />
}
