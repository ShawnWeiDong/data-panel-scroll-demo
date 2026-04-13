import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import MuiTypography from '@mui/material/Typography'
import type { TileItem } from '../types'

const TYPE_COLORS: Record<string, string> = {
  Component: '#4A90D9',
  Property: '#7B68EE',
  Revision: '#50C878',
  Drawing: '#FF8C00',
  Use: '#DC143C',
  Assembly: '#20B2AA',
  Order: '#DAA520',
  Plan: '#9370DB',
}

interface HorizontalTileProps {
  item: TileItem
}

export default function HorizontalTile({ item }: HorizontalTileProps) {
  const color = TYPE_COLORS[item.type] ?? '#888'

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: '6px 10px',
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        cursor: 'pointer',
        flexShrink: 0,
        '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
      }}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: 0.5,
          bgcolor: color,
          flexShrink: 0,
        }}
      />
      <MuiTypography
        variant="caption"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: '0.72rem',
          lineHeight: 1.2,
        }}
      >
        {item.label}
      </MuiTypography>
    </Paper>
  )
}
